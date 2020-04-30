import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth.guard';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { LoginComponent } from './views/login/login.component';

import {GlobalComps} from './extend/globalComps';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseInterceptor } from './services/base.service';
import {Http} from './services/http';


const httpInterceptorProviders = [
 { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true },
];

registerLocaleData(zh);

// 状态管理 https://blog.csdn.net/liutongj/article/details/92696305
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ...GlobalComps
  ],
  providers: [
    httpInterceptorProviders,
    Http,
    AuthGuard, 
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
