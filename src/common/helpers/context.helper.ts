import { HttpArgumentsHost } from '@nestjs/common/interfaces';

export function getRequestLang(context: HttpArgumentsHost) {
  return context.getRequest().headers['lang'] || context.getRequest().i18nLang;
}
