import { NestFactory } from '@nestjs/core';
import { Config } from './config/config';
import { AppModule } from './app.module';
import { logger } from './app.middleware';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as expressListRoutes from 'express-list-routes';
import * as helmet from 'helmet';
import {HttpExceptionFilter} from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet()); // 保护http请求头部信X-Powered-By等息泄露
  app.enableCors({
    credentials: true,
    origin: true,
  });  // 解决跨域问题

  //app.setGlobalPrefix('nest'); // 全局路由前缀

  //配置cookie中间件
  app.use(cookieParser("this signed cookies"));

  //配置session的中间件
  app.use(session({
    secret: 'keyboard cat',
    resave: false,//强制session保存到session store中
    saveUninitialized: false,//强制没有‘初始化’的session保存到storage中
    cookie: { maxAge: Config.sessionMaxAge, httpOnly: false },
    rolling: true
  }));

  app.use(logger); // 全局中间件
  // 静态资源文件夹
  app.useStaticAssets('public', {
    prefix: '/static/', //设置虚拟路径
  });
  // 配置模板引擎 res.redirect('/user'); //路由跳转
  app.setBaseViewsDir(join(__dirname, '..', 'views')) // 放视图的文件
  app.setViewEngine('ejs');

  app.useGlobalFilters(new HttpExceptionFilter());  // 异常处理

  await app.listen(4210);

  // 打印全部路由路径 
  const server = app.getHttpServer();
  const router = server._events.request._router;
  console.log(expressListRoutes({}, 'API:', router));
}
bootstrap();
