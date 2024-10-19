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
    const error = exception.getResponse() as {
      key: string;
      args: Record<string, any>;
    };

    try {
      const message = this.i18n.translate(error.key, {
        lang: context.getRequest().headers['lang'] || context.getRequest().i18nLang,
        args: error.args,
      });
      response.status(statusCode).json({ statusCode, message });
    } catch {
      response.status(statusCode).json(error);
    }
  }
}
