import { IExpressRequest } from '@app/types/express-request.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { UserType } from '../types/user.type';

export const User = createParamDecorator(
	(data: keyof UserType, context: ExecutionContext): UserType | UserType[keyof UserType] => {
		let req: IExpressRequest;

		if (context.getType() === 'http') {
			req = context.switchToHttp().getRequest<IExpressRequest>();
		} else if (context.getType<GqlContextType>() === 'graphql') {
			req = GqlExecutionContext.create(context).getContext().req;
		} else {
			return null;
		}

		const user = req.user;

		if (!user) {
			return null;
		}

		return data ? user[data] : user;
	},
);
