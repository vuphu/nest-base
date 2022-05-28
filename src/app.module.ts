import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbConfig } from './configs/database.config';
import { EventModule } from './modules/events/event.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DbConfig, EventModule, UsersModule],
  controllers: [AppController],
})
export class AppModule {}
