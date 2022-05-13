import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { TokenPair } from '../types/token-pair.interface';

@ArgsType()
export class RefreshTokenArgs implements Pick<TokenPair, 'refreshToken'> {
	@Field()
	@IsString()
	refreshToken: string;
}
