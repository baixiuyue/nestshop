import { Component, OnInit,ViewChild } from '@angular/core';
import {  userInfo } from '../../../../interface/ngRxinterface';
import {TootsService} from '../../../../services/toots.service';
import {Helper } from '../../../../extend/helper';
import { Http } from '../../../../services/http';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('addedituser') addedituser; // this.addedituser.colseModal();
  isLoad: boolean = false;
  visible: boolean = false;
  userInfo: userInfo;
  selectItem = null;
  userName: FormControl = new FormControl('');
  dataList:Array<object> = [];
  urls = {
    dataList:'manager',
    delete:'delManager'
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

  delete($data){
    this.toots.confirm(`确定要删除管理员：${$data.username}吗？`,()=>{
      this.isLoad = true;
      this.$http.post(this.urls.delete,{id:$data._id,username:$data.username}).subscribe(
        res=>{
          this.isLoad = false;
          this.toots.message(res.statusCode === 0?'success':'error', res.message);
          if(res.statusCode === 0){
            this.getList();
          }
        }
      )
    });
  }
  getList(){
    this.isLoad = true;
    this.$http.get(this.urls.dataList,{username:this.userName.value}).subscribe(
      res => {
        this.isLoad = false;
        if (res.statusCode === 0) {
          let data = res.data || [];
          data.map(el=>{
            el.role = el.role[0].title;
            el.statusTitle = el.status?'<font class="text-green-600">启用</font>':'<font class="text-red-600">禁用</font>';
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
    this.selectItem =null;
    this.visible = true;
  }
  openEdit($data): void{
    this.selectItem = Object.assign({},$data);
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }

}
