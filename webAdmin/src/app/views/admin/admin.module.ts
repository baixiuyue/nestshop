import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule,components} from './admin-routing.module';

import { IconsProviderModule } from '../../icons-provider.module';

import { GlobalComps } from '../../extend/globalComps';
import { AdmonComps } from '../../extend/adminComps';

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IconsProviderModule,
    ...GlobalComps,
    ...AdmonComps
  ],
})
export class AdminModule { }
