import { UserEntity } from '@app/user/user.entity';
import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { LoginUserArgs } from './login-user.args';

@InputType()
export class RegisterUserInput
	extends LoginUserArgs
	implements Pick<UserEntity, 'username' | 'email' | 'password'>
{
	@Field()
	@Length(2)
	@IsString()
	username: string;
}
