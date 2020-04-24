import { Controller,Get, Request, Response, } from '@nestjs/common';
import { Config }  from '../../../../config/config';
import { getCaptcha } from '../../../../extend/helper';

@Controller(Config.adminPath)
export class LoginController {
  @Get('code')
  getCode(@Request() req, @Response() res) {
      var svgCaptcha = getCaptcha();
      //设置session
      req.session.code = svgCaptcha.text;
      res.type('image/svg+xml');
      res.send(svgCaptcha.data);
  }

}
