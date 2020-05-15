import { HttpException } from '@nestjs/common';

export enum ResponseErrorType {
  /**
   * 没有错误, 默认值
   */
  no = 0,
  /**
   * 未知错误
   */
  unknown = 104,
  /**
   * 格式不正确
   */
  incorrectFormat = 300,
  /**
   * 没有权限
   */
  unauthorized = 401,
  /**
   * token已过期
   */
  authorizedExpiresDate = 402,
  /**
     * 账号被禁用
     */
  disable = 997,
  /**
   * 未登录,请先登录
   */
  notLogin = 998,
  /**
     * 账号异地登录
     */
  otherLogin = 999,
  /**
  * 验证码不正确
  */
  codeWrong = 1000,
  /**
 * 用户名或者密码不正确
 */
  userWrongPassword = 1001,
}
export const ResponseErrorMsg: { [key: number]: string } = {
  0: '',
  401: '您没有此权限',
  402: '您的权限已过期, 请重新登录',
  997: '账号被禁用',
  998: '未登录,请先登录',
  999: '账号异地登录',
  1000: '验证码不正确',
  1001: '用户名或者密码不正确',
};

export class ResponseErrorEvent extends HttpException {
  constructor(error: ResponseErrorType, msg?: string | string[]) {
    msg = msg ? (typeof msg === 'string' ? msg : msg.join('|')) : '';
    super(msg, error);
  }
}
