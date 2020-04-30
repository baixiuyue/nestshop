import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './services/auth.guard';

const guard = { canActivate: [AuthGuard], canActivateChild: [AuthGuard] };
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren:  () => import('./views/admin/admin.module').then(m => m.AdminModule),
    ...guard
  },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
