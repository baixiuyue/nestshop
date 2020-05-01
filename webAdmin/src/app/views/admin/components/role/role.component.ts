import { Component, OnInit } from '@angular/core';
import { adminState, userInfo } from '../../../../extend/interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAdimState } from '../../../../services/store/adminReducer';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  userInfo: userInfo;
  $adminState: Observable<adminState>
  constructor(private store: Store<adminState>) {
    this.$adminState = store.select(getAdimState);
    this.$adminState.subscribe(
      res => {
        this.userInfo = res.userInfo;
      },
    );
  }
  ngOnInit(): void {
  }

}
