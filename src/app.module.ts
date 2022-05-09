import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import getOrmConfig from '@app/configs/orm.config';

@Module({
	imports: [
		AuthModule,
		UserModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			debug: true,
			playground: true,
			autoSchemaFile: 'scheme.gql',
		}),
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(getOrmConfig),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
