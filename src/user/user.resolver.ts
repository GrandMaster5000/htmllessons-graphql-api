import { Query, Resolver } from '@nestjs/graphql';
import { UserType } from './types/user.type';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [UserEntity])
	async users(): Promise<UserType[]> {
		return this.userService.getAll();
	}
}
