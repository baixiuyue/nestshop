import { ResponseData } from './ResponseData';
import { ResponseErrorEvent } from './ResponseErrorEvent';

export function ResponseDecorator(successMsg?: string) {
  return (target, key, descriptor: PropertyDescriptor) => {
    const oldValue = descriptor.value;
    descriptor.value = async function() {
      const res = new ResponseData({});
      try {
        const data = await oldValue.apply(this, arguments);
        res.statusCode = data.statusCode;
        res.message = successMsg || data.message || '';
        res.data = data.data;
      } catch (evt) {
        if (evt instanceof ResponseErrorEvent) {
          const errorEvent = evt as ResponseErrorEvent;
          res.statusCode = errorEvent.getStatus();
          res.message = errorEvent.message;
        } else {
          res.data = evt;
        }
      }
      return res;
    };
    return descriptor;
  };
}
