import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AdminModule } from './module/admin/admin.module';
import { ApiModule } from './module/api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DefaultModule } from './module/default/default.module';
import { Config } from './config/config';
import {HttpExceptionFilter} from './http-exception.filter';

@Module({
  imports: [AdminModule, ApiModule, DefaultModule,
    MongooseModule.forRoot(Config.mongmdbUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }) // 链接数据库
  ],
  controllers: [],
  providers: [
    { // 异常处理
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
