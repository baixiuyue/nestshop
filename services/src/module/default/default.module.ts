import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DefaultMiddleware } from './default.middleware';
import { Config } from '../../config/config';

@Module({})
export class DefaultModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DefaultMiddleware) // default全局中间件
      .forRoutes(Config.apiPath + '/*');
  }
}
