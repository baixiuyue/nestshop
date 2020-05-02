import { Component, OnInit } from '@angular/core';
import { userInfo } from '../../../../interface/ngRxinterface';
import {TootsService} from '../../../../services/toots.service';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

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
