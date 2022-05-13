import { UserType } from '@app/user/types/user.type';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import {
	INVALID_PASSWORD,
	NOT_VALID_TOKEN,
	SIGN_IN_ERROR,
	USER_EMAIL_NOT_FOUND,
} from './auth.constants';
import { LoginUserArgs } from './inputs/login-user.args';
import { RefreshTokenArgs } from './inputs/refreash-token.args';
import { RegisterUserInput } from './inputs/register-user.input';
import { TokenPair } from './types/token-pair.interface';
import { UserAndTokens } from './types/user-and-tokens.type';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async register(input: RegisterUserInput): Promise<UserAndTokens> {
		const user = await this.userService.createUser(input);
		const tokens = await this.issueTokenPair({ id: user.id, email: user.email });

		return { ...user, ...tokens };
	}

	async login(input: LoginUserArgs): Promise<UserAndTokens> {
		const user = await this.userRepository.findOne(
			{
				email: input.email,
			},
			{
				select: [
					'id',
					'username',
					'email',
					'password',
					'avatarPath',
					'country',
					'createdAt',
					'updatedAt',
					'description',
					'isRealTime',
					'isVerified',
					'rememberToken',
					'socialLink',
				],
			},
		);

		if (!user) {
			throw new UnauthorizedException(USER_EMAIL_NOT_FOUND);
		}

		const isComparePass = await compare(input.password, user.password);

		if (!isComparePass) {
			throw new UnauthorizedException(INVALID_PASSWORD);
		}

		delete user.password;

		const tokens = await this.issueTokenPair({ id: user.id, email: user.email });

		return {
			...user,
			...tokens,
		};
	}

	async issueTokenPair({ id, email }: Pick<UserEntity, 'id' | 'email'>): Promise<TokenPair> {
		const data: Pick<UserType, 'id' | 'email'> = { id: id, email };

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '30d',
		});

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '3h',
		});

		return { refreshToken, accessToken };
	}

	async getNewTokens({ refreshToken }: RefreshTokenArgs): Promise<UserAndTokens> {
		if (!refreshToken) throw new UnauthorizedException(SIGN_IN_ERROR);

		const result = await this.jwtService.verifyAsync(refreshToken);
		if (!result) throw new UnauthorizedException(NOT_VALID_TOKEN);

		const user = await this.userService.findByCond({ id: result.id });

		const tokens = await this.issueTokenPair({ id: user.id, email: user.email });

		return {
			...user,
			...tokens,
		};
	}
}
