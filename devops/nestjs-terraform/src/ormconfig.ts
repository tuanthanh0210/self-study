import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  host: process.env.MYSQL_HOST,
  type: 'mysql',
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  entities: ['src/models/entities/*.ts'],
  synchronize: false,
  migrations: ['src/models/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/models/migrations',
  },
};
export = config;
