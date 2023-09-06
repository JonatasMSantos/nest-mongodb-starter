import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  logger = new Logger();

  constructor() {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    const collection = request.headers.collection;
    console.log(collection);
    /*
    if (condiction) {
      throw new ForbiddenException(
        'Unauthorized operation. You are not logged in or do not have permission',
      );
    }*/

    //TODO: Permission access
    const baseUrl = request.baseUrl;
    this.logger.log(baseUrl, `${AppMiddleware.name}:32`);

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        `${AppMiddleware.name}:35`,
      );
    });

    next();
  }
}
