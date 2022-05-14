import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserInput } from '../auth/inputs/register-user.input';
import { UserEntity } from './user.entity';
import { USER_ALRERADY_EXIST, USER_NOT_FOUND } from './user.constants';
import { UserType } from './types/user.type';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
	) {}

	async createUser(input: RegisterUserInput): Promise<UserType> {
		const { email, password, username } = input;

		const oldUser = await this.userRepository
			.createQueryBuilder('u')
			.where('u.email = :email OR u.username = :username', { email, username })
			.getOne();

		if (oldUser) {
			throw new BadRequestException(USER_ALRERADY_EXIST);
		}

		const newUser = this.userRepository.create({
			email,
			username,
			password,
		});

		return this.userRepository.save(newUser);
	}

	async getAll(): Promise<UserType[]> {
		return this.userRepository.find();
	}

	async findByCond(cond: Partial<UserEntity>): Promise<UserType> {
		const user = await this.userRepository.findOne(cond);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		return user;
	}
}
