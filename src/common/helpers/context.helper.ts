import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request } from 'express';

export function getRequestLang(context: HttpArgumentsHost): string {
  const request = context.getRequest<Request & { i18nLang?: string }>();
  return (request.headers['lang'] as string | undefined) || request.i18nLang;
}
