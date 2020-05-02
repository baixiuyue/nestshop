import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { userInfo } from '../../interface/ngRxinterface';
import {Config} from '../../configs/config';
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
    this.toots.outLogin();
  }

}
