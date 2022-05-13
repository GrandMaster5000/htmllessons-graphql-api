import { UserEntity } from '@app/user/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { TokenPair } from '../types/token-pair.interface';

@ObjectType()
export class AuthUser extends UserEntity implements TokenPair {
	@Field()
	refreshToken: string;

	@Field()
	accessToken: string;
}
