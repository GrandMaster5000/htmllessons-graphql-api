import { Field, ID, ObjectType } from '@nestjs/graphql';
import { genSalt, hash } from 'bcrypt';
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export enum UserRole {
	ADMIN = 'admin',
	EDITOR = 'editor',
	STUDENT = 'student',
}

@ObjectType()
@Entity({ name: 'user' })
export class UserEntity {
	@Field((type) => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ unique: true })
	email: string;

	@Field({ nullable: true })
	@Column({ select: false })
	password: string;

	@Field()
	@Column({ unique: true })
	username: string;

	@Field()
	@Column('text', { default: '' })
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
	@Column({ default: '' })
	country: string;

	@Field()
	@Column({ default: '' })
	socialLink: string;

	@Field()
	@Column({ nullable: true })
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

	@BeforeInsert()
	async hashPassword(): Promise<void> {
		const salt = await genSalt(+process.env.SALT);
		this.password = await hash(this.password, +salt);
	}
}
