import OrmConfig from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const DbConfig = TypeOrmModule.forRoot(OrmConfig);
