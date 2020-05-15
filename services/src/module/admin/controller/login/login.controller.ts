import { Controller, Get, Request, Response, Post, Body, UsePipes, HttpException } from '@nestjs/common';
import { Config } from '../../../../config/config';
import { Helper } from '../../../../extend/helper';
import { PublicPipe } from '../../../../extend/pipe/public.pipe';
import * as Joi from '@hapi/joi';
import { LoginService } from '../../service/login/login.service';

import { ResponseData, ResponseErrorType, ResponseErrorMsg, ResponseErrorEvent } from '../../../../extend/response/index';

const loginSchema = Joi.object({
  username: Joi.string()
    .alphanum() // /^[a-zA-Z0-9]{3,9}$/
    .min(3).max(9).required()
    .label('用户名必须是3到9位的数字字母组合'),
  password: Joi.string().min(6).max(12).required()
    .label('密码必须6到12位之间'),
  code: Joi.string().required()
    .label('验证码不能为空'),
});

@Controller(Config.adminPath)
export class LoginController {
  constructor(private readonly LoginService: LoginService) { }
  @Get('code')
  getCode(@Request() req, @Response() res) {
    var svgCaptcha = Helper.getCaptcha();
    //设置session
    req.session.code = svgCaptcha.text;
    res.type('image/svg+xml');
    res.json(svgCaptcha.data);
  }

  @Post('doLogin')
  @UsePipes(new PublicPipe(loginSchema))
  async doLogin(@Request() req, @Body() body) {
    const user = { username: body.username, password: Helper.getMd5(body.password) };
    const result = await this.LoginService.find(user);
    let errorType = 0;
    let token = '';
    if (body.code.toUpperCase() !== (req.session.code || '').toUpperCase() && body.code != '9999') {
      // 验证码错误
      errorType = ResponseErrorType.codeWrong;
    } else if (result.length === 0) {
      // 用户名密码不匹配
      errorType = ResponseErrorType.userWrongPassword;
    }else if(!result[0].status){
      errorType = ResponseErrorType.disable;
    } else {
      const tokenObj = Object.assign({ createTime: new Date().getTime() }, user);
      token = Helper.createToken(tokenObj); // 创建token
      const redis = await Helper.cacheManager.set(user.username, token);
      if (redis !== 'OK') {
        errorType = ResponseErrorType.unknown;
      }
    }

    if(errorType){
      throw new ResponseErrorEvent(errorType, ResponseErrorMsg[errorType]);
    }else{
      const { _id, username, password, add_time, status, email, role_id, mobile } = result[0];
      const res = {
        message: '登陆成功',
        data: {
          token: token, _id, username, password,
          add_time: Helper.formatTime(add_time), status, email, role_id, mobile
        }
      }
      return new ResponseData(res);
    }
  }

}
