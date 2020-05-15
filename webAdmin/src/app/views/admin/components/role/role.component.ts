import { Component, OnInit } from '@angular/core';
import { TootsService } from '../../../../services/toots.service';
import { Helper } from '../../../../extend/helper';
import { Http } from '../../../../services/http';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  isLoad: boolean = false;
  dataList: Array<object> = [];
  visible: boolean = false;
  selectItem = null;
  urls = {
    dataList: 'role',
  }
  constructor(private $http: Http, private toots: TootsService) { }
  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.isLoad = true;
    this.$http.get(this.urls.dataList).subscribe(
      res => {
        this.isLoad = false;
        if (res.statusCode === 0) {
          let data = res.data || [];
          data.map(el => {
            el.add_time = Helper.formatTime(el.add_time);
            return el;
          });
          this.dataList = data;
        } else {
          this.toots.message('error', res.message);
        }
      },
      err => {
        this.isLoad = false;
      }
    );
  }
  openAdd(): void {
    this.selectItem = null;
    this.visible = true;
  }
  openEdit($data): void {
    this.selectItem = Object.assign({}, $data);
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }
}
