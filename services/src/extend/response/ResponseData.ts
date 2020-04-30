import { ResponseErrorType } from './ResponseErrorEvent';
export class ResponseData {
  public statusCode: ResponseErrorType = ResponseErrorType.no;
  public message: string = '成功';
  public data: null;
  constructor(initData) {
    Object.assign(this, initData);
  }
}
