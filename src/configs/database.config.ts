import { TypeOrmModule } from '@nestjs/typeorm';
import OrmConfig from './orm.config';

export const DbConfig = TypeOrmModule.forRoot(OrmConfig);
