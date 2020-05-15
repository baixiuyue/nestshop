import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminMiddleware } from './admin.middleware';
import { Config } from '../../config/config';
import { LoginController } from './controller/login/login.controller';
import { LoginService } from './service/login/login.service';
import { ManagerService } from './service/manager/manager.service';
import { ManagerController } from './controller/manager/manager.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from '../../schema/admin.schema';
import { RoleSchema } from '../../schema/role.schema'; 
import { AccessSchema } from '../../schema/access.schema'; 
import { RoleAccessSchema } from '../../schema/role_access.schema'; 
import { RoleService } from './service/role/role.service';
import { RoleController } from './controller/role/role.controller';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema,collection:"admin" },
      { name: 'Role', schema: RoleSchema,collection:"role" } ,
      { name: 'Access', schema: AccessSchema,collection:"access" },
      { name: 'RoleAccess', schema: RoleAccessSchema,collection:"role_access" }  
   ])
  ],
  controllers: [LoginController, ManagerController, RoleController],
  providers: [LoginService, ManagerService, RoleService]
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware) // admin全局中间件
      .forRoutes(Config.adminPath + '/*');
  }
}
