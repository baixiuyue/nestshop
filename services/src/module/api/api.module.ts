import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ApiMiddleware } from './api.middleware';
import { Config } from '../../config/config';

@Module({})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiMiddleware) // api全局中间件
      .forRoutes(Config.apiPath + '/*');
  }
}
