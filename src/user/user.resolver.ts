import { Auth } from '@app/auth/decorators/auth.decorator';
import { Query, Resolver } from '@nestjs/graphql';
import { User } from './decorators/user.decorator';
import { UserType } from './types/user.type';
import { UserEntity, UserRole } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [UserEntity])
	async users(): Promise<UserType[]> {
		return this.userService.getAll();
	}

	@Query(() => UserEntity)
	@Auth([UserRole.ADMIN])
	async user(@User('id') id: number): Promise<UserType> {
		return this.userService.findByCond({ id });
	}
}
