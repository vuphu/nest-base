import { AppController } from './app.controller';
import { DbConfig } from './configs';
import { AuthModule, EventModule, UserModule } from './modules';
import { Module } from '@nestjs/common';

@Module({
  imports: [DbConfig, EventModule, UserModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
