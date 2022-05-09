import { Field } from '@nestjs/graphql';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
	ADMIN = 'admin',
	EDITOR = 'editor',
	STUDENT = 'student',
}

@Entity({ name: 'user' })
export class UserEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	email: string;

	@Field()
	@Column({ select: false })
	password: string;

	@Field()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Field()
	@Column('text')
	description: string;

	@Field()
	@Column({ default: '' })
	avatarPath: string;

	@Field()
	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.STUDENT,
	})
	role: UserRole;

	@Field()
	@Column()
	country: string;

	@Field()
	@Column()
	socialLink: string;

	@Field()
	@Column()
	rememberToken: string;

	@Field()
	@Column({ default: false })
	isVerified: boolean;

	@Field()
	@Column({ default: true })
	isRealTime: boolean;

	@Field()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@Field()
	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}
