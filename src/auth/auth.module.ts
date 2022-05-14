import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserEntity } from '@app/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '@app/configs/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategies';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		UserModule,
		ConfigModule,
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		PassportModule,
	],
	providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
