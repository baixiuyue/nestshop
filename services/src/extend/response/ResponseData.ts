import { ResponseErrorType } from './ResponseErrorEvent';
export class ResponseData<T> {
  public statusCode: ResponseErrorType = ResponseErrorType.no;
  public message: string = '成功';
  public data: T = null;
  constructor(initData) {
    Object.assign(this, initData);
  }
}
