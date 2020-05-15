import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule,components} from './admin-routing.module';

import { IconsProviderModule } from '../../icons-provider.module';

import { GlobalComps } from '../../extend/globalComps';
import { AdmonComps } from '../../extend/adminComps';
import { AddedituserComponent } from './components/user/components/addedituser/addedituser.component';
import { AddeditroleComponent } from './components/role/components/addeditrole/addeditrole.component';

@NgModule({
  declarations: [...components, AddedituserComponent, AddeditroleComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IconsProviderModule,
    ...GlobalComps,
    ...AdmonComps
  ],
})
export class AdminModule { }
