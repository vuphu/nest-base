import { getRequestLang } from '../helpers';
import { I18nService } from 'nestjs-i18n';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class TranslateFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const statusCode = exception.getStatus();

    let message = exception.getResponse() as {
      key: string;
      args: Record<string, any>;
    };

    try {
      message = this.i18n.translate(message.key, {
        lang: getRequestLang(context),
        args: message.args,
      });
    } catch {}

    response.status(statusCode).json({ statusCode, message });
  }
}
