import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserArgs } from './inputs/login-user.args';
import { RefreshTokenArgs } from './inputs/refreash-token.args';
import { RegisterUserInput } from './inputs/register-user.input';
import { AuthUser } from './outputs/auth-user.output';
import { UserAndTokens } from './types/user-and-tokens.type';

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => AuthUser)
	async register(@Args('data') input: RegisterUserInput): Promise<UserAndTokens> {
		return this.authService.register(input);
	}

	@Query(() => AuthUser)
	async login(@Args() input: LoginUserArgs): Promise<UserAndTokens> {
		return this.authService.login(input);
	}

	@Query(() => AuthUser)
	async getNewTokens(@Args() { refreshToken }: RefreshTokenArgs): Promise<UserAndTokens> {
		return this.authService.getNewTokens({ refreshToken });
	}
}
