import { UserType } from '@app/user/types/user.type';
import { Request } from 'express';

export interface IExpressRequest extends Request {
	user?: UserType;
}
