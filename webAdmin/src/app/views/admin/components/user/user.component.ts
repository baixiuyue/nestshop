import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { adminState, userInfo } from '../../../../extend/interface';
import { Store } from '@ngrx/store';
import { getAdimState } from '../../../../services/store/adminReducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isLoad: boolean = false;
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
