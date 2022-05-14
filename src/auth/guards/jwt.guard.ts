import { IExpressRequest } from '@app/types/express-request.interface';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	getRequest(context: ExecutionContext): IExpressRequest {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}
}
