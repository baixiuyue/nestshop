import { Injectable } from '@angular/core';

import { adminState, userInfo } from '../interface/ngRxinterface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAdimState } from './store/adminReducer';
import { SetUserInfo } from './store/action';
import {Config} from '../configs/config';

import { NzModalService, ModalOptions } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class TootsService {
  confirm: Function;
  message: Function;
  constructor(
    public modal: NzModalService,
    private messageModule: NzMessageService,
    private $store: Store<adminState>) {

    this.init();

  }

  init() { // 重写Modal confirm message
    const typeArray = ['info', 'success', 'error', 'warning'];

    typeArray.forEach(el => { // Modal
      this.modal[el] = (content: string, callback?) => {
        const opations: ModalOptions = Object.assign({}, Config.initModal);
        opations.nzContent = content;
        callback && (opations.nzOnOk = callback);
        return this.modal[el](opations);
      }
    });

    this.confirm = (content: string, okCall?, closeCall?) => { confirm
      const opations: ModalOptions = Object.assign({}, Config.initConfirm);
      opations.nzContent = content;
      okCall && (opations.nzOnOk = okCall);
      closeCall && (opations.nzOnCancel = closeCall);
      return this.modal.confirm(opations);
    }

    this.message = (type: string, content: string, opation = {}) => { //message
      const op = Object.assign(opation, Config.initMessage);
      return this.messageModule[type](content, op);
    }
  }
  getAdminState(): Observable<adminState> { // 获取admin状态管理对象
    return this.$store.select(getAdimState);
  }
  setUserInfo(user: userInfo) { // 将用户信息加入状态管理
    this.$store.dispatch(SetUserInfo({ user: user }));
  }
}
