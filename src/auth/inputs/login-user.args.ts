import { UserEntity } from '@app/user/user.entity';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@ArgsType()
export class LoginUserArgs implements Pick<UserEntity, 'email' | 'password'> {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	@Length(6)
	@IsString()
	password: string;
}
