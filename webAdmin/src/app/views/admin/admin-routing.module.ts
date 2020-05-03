import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './components/user/user.component';
import { RoleComponent } from './components/role/role.component';
import { AccessComponent } from './components/access/access.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'user', component: UserComponent, data: { title: '用户管理' } },
      { path: 'role', component: RoleComponent, data: { title: '角色管理' } },
      { path: 'access', component: AccessComponent, data: { title: '权限管理' } },
      { path: '**', redirectTo: 'user' }
    ]
  },
];

export const components =[
  AdminComponent, 
  UserComponent, 
  RoleComponent, 
  AccessComponent
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
