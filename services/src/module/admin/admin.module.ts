import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminMiddleware } from './admin.middleware';
import { Config } from '../../config/config';
import { LoginController } from './controller/login/login.controller';
import { LoginService } from './service/login/login.service';
import { ManagerService } from './service/manager/manager.service';
import { ManagerController } from './controller/manager/manager.controller';

@Module({
  controllers: [LoginController, ManagerController],
  providers: [LoginService, ManagerService]
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware) // admin全局中间件
      .forRoutes(Config.adminPath + '/*');
  }
}
