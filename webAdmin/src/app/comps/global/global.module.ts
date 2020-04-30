import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GLoadComponent} from './g-load/g-load.component'

import { NzSpinModule } from 'ng-zorro-antd/spin';


@NgModule({
  declarations: [GLoadComponent],
  imports: [
    CommonModule,
    NzSpinModule
  ],
  exports:[ GLoadComponent]
})
export class GlobalModule { }
