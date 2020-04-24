import { ResponseErrorType } from './ResponseErrorEvent';

export interface IResponseData<T> {
  statusCode:  ResponseErrorType;
  message: string;
  data?: T;
}
export class ResponseData<T> implements IResponseData<T> {
  public statusCode: ResponseErrorType = ResponseErrorType.no;
  public message: string = '成功';
  public data: T = null;
  constructor(initData?: IResponseData<T>) {
    Object.assign(this, initData);
  }
}
