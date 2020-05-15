import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { userInfo } from '../../interface/ngRxinterface';
import { Config } from '../../configs/config';
import { TootsService } from '../../services/toots.service';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  refresh = false;
  userInfo: userInfo;
  routerTabList: Array<{ url: string, name: string }> = [];
  activeRouterUrl: string;
  constructor(
    private nzContextMenuService: NzContextMenuService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toots: TootsService) {

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRouterUrl = event.url;
        this.activatedRoute.firstChild.data.subscribe(
          data => { // 订阅当前路由的子路由data
            const urlArr = this.routerTabList.map(el => el.url);
            if (urlArr.indexOf(event.url) === -1) {
              if(this.routerTabList.length>=15){ // 最多显示15个
                this.routerTabList.pop();
              }
              this.routerTabList.push({ url: event.url, name: data.title });
            }
          }
        )
      })
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
  close(index) {
    if (this.activeRouterUrl === this.routerTabList[index].url) {
      this.router.navigateByUrl(this.routerTabList[index - 1].url);
    }
    this.routerTabList.splice(index, 1);

  }
  tabClick(url) {
    this.router.navigateByUrl(url);
  }
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
    //this.nzContextMenuService.close();
  }
  refreshClick(){ // 刷新
    this.refresh = true;
    setTimeout(()=>{
      this.refresh = false;
    },100);
  }
  closeAll(){
    this.routerTabList = [];
    this.router.navigateByUrl(Config.firstUrl);
  }
  closeOther(){
    const urlArr = this.routerTabList.map(el => el.url);
    const currItem =  this.routerTabList[urlArr.indexOf(this.activeRouterUrl)];
    this.routerTabList = [];
    this.routerTabList.push(currItem);
  }
}
