export class Config {
  static adminAPIUrl = 'http://localhost:4210/admin/'; // api地址
  static errorCodes: Array<number> = [401,402,998,999]; // 需要跳转登陆的code
  static notTokenUrls: Array<string> = ['admin/code','admin/doLogin']; //不需要token权限的url
  static notLoginUrls:  Array<string> = []; //不需要登陆权限的路由
  static firstUrl: string = 'admin/user'; // 登录后跳转的路由
  static userStorageKay: string = 'USER_INFO'; 

  static initModal = { // modal默认值
    nzTitle: '温馨提示',
    nzOkText: '确认',
  };
  static initConfirm = { // confirm默认值
    nzTitle: '温馨提示',
    nzOkText: '确认',
    nzCancelText: '取消',
  };
  static initMessage = { // message默认值
    nzDuration: 3 * 1000 // 多久关闭
  };
}