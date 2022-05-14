import { UserEntity } from '@app/user/user.entity';
import { Field, InputType, IntersectionType, PartialType, PickType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { LoginUserArgs } from './login-user.args';

@InputType()
export class RegisterUserInput
	extends PickType(LoginUserArgs, ['email', 'password'], InputType)
	implements Pick<UserEntity, 'username' | 'email' | 'password'>
{
	@Field()
	@Length(2)
	@IsString()
	username: string;
}
