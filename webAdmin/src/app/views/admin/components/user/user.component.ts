import { Component, OnInit } from '@angular/core';
import {  userInfo } from '../../../../interface/ngRxinterface';
import {TootsService} from '../../../../services/toots.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isLoad: boolean = false;
  userInfo: userInfo;

  constructor(private toots:TootsService) {
    this.toots.getAdminState().subscribe( 
      res => {
        this.userInfo = res.userInfo;
      },
    );
  }

  ngOnInit(): void {
  }

}
