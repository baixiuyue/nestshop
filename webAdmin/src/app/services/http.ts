import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
    withCredentials: true
  };

@Injectable()
export class Http {
    constructor(private http: HttpClient) { }
    /**
     * @param {string} url地址
     * @param {any} [options]
     */
    get(url: string, options?: any): Observable<any> {
        url += (url.indexOf('?') < 0 ? '?' : '&') + this.param(options) + '&_now=' + (new Date().getTime());
        return this.http.get(url,httpOptions).pipe(map(res => res));
    }

    /**
     * @param url地址
     * @param options提交的数据
     */
    post(url: string, options?: any): Observable<any> {
        return this.http.post(url, options,httpOptions).pipe(map(res => res));
    }
    /**
     * @param {any} data
     * @returns
     * @title:封装一个序列化get请求的参数的方法
     */
    param(data): string {
        let url = '';
        // tslint:disable-next-line:forin
        for (const k in data) {
            const value = data[k] !== undefined ? data[k] : '';
            url += `&${k}=${encodeURIComponent(value)}`;
        }
        return url ? url.substring(1) : '';
    }
}