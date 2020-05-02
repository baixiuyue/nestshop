import { Injectable } from '@angular/core';
import { Config } from '../configs/config';
import { HttpInterceptor, HttpHandler, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs'
import { catchError, retry, tap } from 'rxjs/operators';
import { Router} from '@angular/router';

import { adminState, userInfo } from '../interface/ngRxinterface';
import { Store } from '@ngrx/store';
import { getAdimState } from '../services/store/adminReducer';

const baseurl = Config.adminAPIUrl;
let userInfo: userInfo;
@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  constructor(
    private router:Router,
    private store: Store<adminState>) {

      store.select(getAdimState).subscribe(
        res => {
         userInfo = res.userInfo;
        },
      );

     }
  intercept(req, next: HttpHandler) {
    let url = `${baseurl}${req.url}` ;
    if (/^https?:\/\//.test(req.url)) {
      url =  `${req.url}`;
    }
    req = req.clone({ url: url});
    //不需要token的请求
    const notToken = Config.notTokenUrls.some(url=>req.url.indexOf(url)>-1);
    const token = req.headers.get('access_token');
    if (!notToken && token) {
      req.headers = req.headers.set('access_token', userInfo.token || 'is not token');
    }
    // send cloned request with header to the next handler.
    return next.handle(req)
      .pipe(
        tap(res=>{
           if(res instanceof HttpResponse){ // response拦截
             const code = res.body.statusCode;
             if(Config.errorCodes.indexOf(code)){ // 退出登录
              this.router.navigateByUrl('/login');
             }
           }
        }),
        //retry(2),/*失败时重试2次，可自由设置*/
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      console.error('发生错误:', error.error.message);
    } else {
      console.error(
        `错误码 code ${error.status}, ` +
        `错误消息: ${error.error}`);
    }
    return throwError('please try again later.');
  };
}
