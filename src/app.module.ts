import { AppController } from './app.controller';
import { ClsSetting, DatabaseSetting, I18nSetting } from './settings';
import { AuthModule, EventModule, UserModule } from './modules';
import { TranslateFilter } from './common/middlewares';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestInfoInterceptor } from './common/interceptors/request-info.interceptor';

@Module({
  imports: [DatabaseSetting, I18nSetting, ClsSetting, EventModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TranslateFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInfoInterceptor,
    },
  ],
})
export class AppModule {}
