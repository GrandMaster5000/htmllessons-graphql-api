import { UserType } from '@app/user/types/user.type';
import { UserRole } from '@app/user/user.entity';
import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DONT_HAVE_ACCESS } from '../auth.constants';

export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}

		const req = context.switchToHttp().getRequest<{ user: UserType }>();
		const user = req.user;

		const isAccess = roles.includes(user.role);

		if (!isAccess) {
			throw new ForbiddenException(DONT_HAVE_ACCESS);
		}

		return isAccess;
	}
}
