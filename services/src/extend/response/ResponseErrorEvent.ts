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
}
export const ResponseErrorMsg: { [key: number]: string } = {
  0: '',
  401: '您没有此权限',
  402: '您的权限已过期, 请重新登录',
};

export class ResponseErrorEvent extends HttpException {
  constructor(error: ResponseErrorType, msg?: string | string[]) {
    msg = msg ? (typeof msg === 'string' ? msg : msg.join('|')) : '';
    super(msg, error);
  }
}
