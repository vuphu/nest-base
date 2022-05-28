import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { env } from './env.config';

console.log(`${process.cwd()}/dist/modules/*/migrations/*.js`);
export default <PostgresConnectionOptions>{
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  synchronize: false,
  entities: [`dist/modules/*/models/*.js`],
  migrations: [`dist/modules/*/migrations/*.js`],
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
};
