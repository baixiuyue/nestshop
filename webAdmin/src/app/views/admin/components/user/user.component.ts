import { Component, OnInit } from '@angular/core';
import {  userInfo } from '../../../../interface/ngRxinterface';
import {TootsService} from '../../../../services/toots.service';
import { Config } from '../../../../configs/config';
import { Http } from '../../../../services/http';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isLoad: boolean = false;
  userInfo: userInfo;
  dataList:Array<object> = [];
  urls = {
    dataList:'manager'
  };
  constructor(private $http: Http,
    private toots:TootsService) {

    this.toots.getAdminState().subscribe( 
      res => {
        this.userInfo = res.userInfo;
      },
    );
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.isLoad = true;
    this.$http.get(this.urls.dataList).subscribe(
      res => {
        this.isLoad = false;
        if (res.statusCode === 0) {
          this.dataList = res.data || [];
        } else {
          this.toots.message('error', res.message);
        }
      },
      err => {
        this.isLoad = false;
      }
    );
  }

}
