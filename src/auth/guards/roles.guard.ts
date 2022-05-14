import { IExpressRequest } from '@app/types/express-request.interface';
import { UserRole } from '@app/user/user.entity';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DONT_HAVE_ACCESS } from '../auth.constants';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context);
		const roles = this.reflector.get<UserRole[]>('roles', ctx.getHandler());
		if (!roles) {
			return true;
		}

		const req: IExpressRequest = ctx.getContext().req;
		const user = req.user;

		const isAccess = roles.includes(user.role);

		if (!isAccess) {
			throw new ForbiddenException(DONT_HAVE_ACCESS);
		}

		return isAccess;
	}
}
