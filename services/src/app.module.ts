import { Module } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { ApiModule } from './module/api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DefaultModule } from './module/default/default.module';
import { Config } from './config/config';

@Module({
  imports: [AdminModule, ApiModule, DefaultModule,
    MongooseModule.forRoot(Config.mongmdbUrl,{ useNewUrlParser: true }) // 链接数据库
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
