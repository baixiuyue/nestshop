import { Component, OnInit } from '@angular/core';
import { Config } from '../../configs/config';
import { Http } from '../../services/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import * as Joi from '@hapi/joi';
import { Helper } from '../../extend/helper';
import { TootsService } from '../../services/toots.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordVisible = false;
  urls = {
    code: 'code',
    doLogin: 'doLogin'
  };
  svgCaptcha: SafeResourceUrl; // 验证码图片
  code: string;
  username: string;
  password: string;
  isLoad: boolean = false;

  constructor(private $http: Http,
    private router: Router,
    private toots: TootsService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getCode();
  }
  verification() {
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
    const param = {
      username: this.username,
      password: this.password,
      code: this.code
    };
    return Helper.publicPipe(loginSchema, param);
  }
  doLogin() {
    const param = this.verification();
    if (param instanceof Array) { // 验证错误
      this.toots.message('error', param[0]);
      return false;
    }
    this.$http.post(this.urls.doLogin, param).subscribe(
      res => {
        this.isLoad = false;
        if (res.statusCode === 0) {
          this.toots.setUserInfo(res.data);
          this.toots.$storage.set(Config.userStorageKay,res.data);
          this.router.navigateByUrl(Config.firstUrl);
        } else {
          this.toots.message('error', res.message);
        }
      },
      err => {
        this.isLoad = false;
      }
    );
  }
  getCode() {
    this.$http.get(this.urls.code).subscribe(res => {
      const base64Data = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(res)))}`;
      this.svgCaptcha = this.sanitizer.bypassSecurityTrustResourceUrl(base64Data);
    });
  }

}
