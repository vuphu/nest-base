import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbConfig } from './configs/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/events/event.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [DbConfig, EventModule, UserModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
