import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ResponseErrorType, ResponseErrorEvent } from '../response/index';

@Injectable()
// 公共管道
export class PublicPipe implements PipeTransform {
  //  @UsePipes(new ShopPipe(rootInfo))
  constructor(private readonly schema) { }
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      const keys = [];
      let errMsgs: string[] = [];
      error.details.forEach(e => {
        const { key, label } = e.context;
        if (keys.indexOf(key) === -1) {
          errMsgs.push(label);
          keys.push(key);
        }
      });
      const errorType = ResponseErrorType.incorrectFormat;
      errMsgs = [...new Set(errMsgs)];
      const msg = errMsgs.length > 1 ? errMsgs : errMsgs[0];
      throw new ResponseErrorEvent(errorType, msg);
    }
    return value;
  }
}
