import { Injectable } from '@angular/core';
import { Config } from '../configs/config';
import { Router } from '@angular/router';
import { TootsService } from './toots.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUrl: string;
  constructor(private router: Router, private toots: TootsService) {

  }
  isLogin() {
    if (Config.notLoginUrls.indexOf(this.redirectUrl) === -1) {
      this.toots.getAdminState().subscribe(
        res => {
          const notLogin =(!res || !res.userInfo.token);
          if (notLogin && this.redirectUrl !== '/login') {
            this.router.navigate(['/login']);
          }else if(this.redirectUrl === '/login' && !notLogin){
            this.router.navigate([Config.firstUrl]);
          }
        }
      );
    };
    return true;
  }
}
