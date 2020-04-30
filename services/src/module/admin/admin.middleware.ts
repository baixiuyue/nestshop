import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from '../../config/config';
import * as jwt from 'jsonwebtoken';
import { Helper } from '../../extend/helper';
import { ResponseErrorType, ResponseErrorMsg, ResponseErrorEvent } from '../../extend/response/index';
@Injectable()
export class AdminMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const nsExcludes = [`/${Config.adminPath}/code`, `/${Config.adminPath}/doLogin`];
    const baseUrl = req.baseUrl;
    const token = req.headers['access_token'];
    let userInfo;
    let errorType;
    if (nsExcludes.indexOf(baseUrl) === -1) {
      if (!token) {
        errorType = ResponseErrorType.notLogin; // 未登录
      }
      try {
        userInfo = jwt.verify(token, Config.tokenKey);
        let now = (Math.floor(Date.now() / 1000) + (60 * 60));
        if (userInfo.exp < now) { // token过期
          errorType = ResponseErrorType.authorizedExpiresDate;
        } else {
        await Helper.cacheManager.get(userInfo.username, function (err, result) {
            if (result && result !== token) { // 账号异地登录
              errorType = ResponseErrorType.otherLogin
            } else if (result === undefined) { //  拿不到缓存值 没登录或者非法操作
              errorType = ResponseErrorType.unauthorized;
            }
          });
        }
      } catch (e) { //  无权限 token解密失败
        errorType = ResponseErrorType.unauthorized;
      }
    }
    if(errorType){
      throw new ResponseErrorEvent(errorType, ResponseErrorMsg[errorType]);
    }else{
      next();
    }
  }
}
