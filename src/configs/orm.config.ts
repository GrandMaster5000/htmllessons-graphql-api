import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const getOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: +process.env.DATABASE_PORT,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: [__dirname + '\\**\\*.entity{.ts,.js}'],
	migrations: [__dirname + '\\migrations\\**\\*{.ts,.js}'],
	synchronize: true,
	cli: {
		migrationsDir: 'src/migrations',
	},
};

export default getOrmConfig;
