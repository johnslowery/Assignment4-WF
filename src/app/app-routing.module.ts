import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { SecretUserComponent } from './secret-user/secret-user.component';

const routes: Routes = [

  {
    path:'',
    redirectTo: 'create',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'secret',
    component: SecretUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'create',
    component: CreateUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
