import { AppController } from './app.controller';
import { DatabaseSetting, I18nSetting } from './settings';
import { AuthModule, EventModule, UserModule } from './modules';
import { TranslateFilter } from './common/middlewares';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [DatabaseSetting, I18nSetting, EventModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TranslateFilter,
    },
  ],
})
export class AppModule {}
