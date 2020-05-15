import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

// 验证提示语
export const autoTips: Record<string, Record<string, string>> = {
  'zh-cn': {
    required: '必填项',
    email: '邮箱格式不正确'
  }
};
export type MyErrorsOptions = { 'zh-cn': string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

// https://www.jianshu.com/p/6221e4eee4a5

export class MyValidators extends Validators {

  // 非空 required email
  

  // 最小长度验证
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}` } };
    };
  }

  // 最大长度验证
  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}` } };
    };
  }

  //  手机号码验证
  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;
    return patternValidation('mobile',value,/(^1\d{10}$)/,'手机号码格式不正确');
  }

  // 只能是数字和字母组合
  static letterAndNumber(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;
    return patternValidation('letterAndNumber',value,/^[a-zA-Z0-9]+$/,'只能是数字和字母组合');
  }
}
// 正则验证
function patternValidation (validationName:string, value:string,pattern:RegExp,errorTip:string): MyValidationErrors | null{
  let result = null;
  if (value == null || value.length === 0) {
    result = null;
  }else if(typeof value === 'string' && pattern.test(value)){
    result = null;
  } else {
    result = { [validationName]: { 'zh-cn': errorTip } };
  }
  return result;
}
