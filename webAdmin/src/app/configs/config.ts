export class Config {
  static adminAPIUrl = 'http://localhost:4210/admin/'; // api地址
  static errorCodes: Array<number> = [401,402,998,999]; // 需要跳转登陆的code
  static notTokenUrls: Array<string> = ['admin/code','admin/doLogin']; //不需要token权限的url
}