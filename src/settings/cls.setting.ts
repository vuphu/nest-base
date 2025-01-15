import { DatabaseSetting } from './database.setting';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { ClsModule } from 'nestjs-cls';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { getDataSourceToken } from '@nestjs/typeorm';

export const ClsSetting = ClsModule.forRoot({
  global: true,
  middleware: { mount: true },
  plugins: [
    new ClsPluginTransactional({
      imports: [DatabaseSetting],
      adapter: new TransactionalAdapterTypeOrm({
        dataSourceToken: getDataSourceToken(),
      }),
    }),
  ],
});
