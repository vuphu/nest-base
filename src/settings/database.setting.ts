import { env } from './env.setting';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const DatabaseSetting = TypeOrmModule.forRoot(<PostgresConnectionOptions>{
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
});
