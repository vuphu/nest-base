import { AppController } from './app.controller';
import { DbConfig, I18nConfig } from './configs';
import { AuthModule, EventModule, UserModule } from './modules';
import { TranslateFilter } from './common/middlewares';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [DbConfig, I18nConfig, EventModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TranslateFilter,
    },
  ],
})
export class AppModule {}
