import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { PostListComponent } from './post-list/post-list.component';
import { SecretUserComponent } from './secret-user/secret-user.component';

const routes: Routes = [

  {
    path:'',
    redirectTo: 'viewpost',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'viewpost',
    component: PostListComponent
  },
  {
    path:'createpost',
    component: CreatePostComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'secret',
    component: SecretUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'createaccount',
    component: CreateUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
