import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { userInfo } from '../../interface/ngRxinterface';
import { TootsService } from '../../services/toots.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  userInfo: userInfo;
  constructor(
    private router: Router,
    private toots: TootsService) {

    this.toots.getAdminState().subscribe(
      res => {
        this.userInfo = res.userInfo;
      },
    )
  }

  ngOnInit(): void {
  }
  outLogin() {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { 'session_id': '123' },
    //   fragment: 'anchor'
    // };
    // this.router.navigate(['/news'], navigationExtras);
    this.toots.setUserInfo({});
    this.router.navigateByUrl('/login');
  }

}
