import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private authGuardService: AuthGuardService, private activatedRoute: ActivatedRoute) { }
  userId: string='';
  password: string='';
  errorMsg: string='';

  ngOnInit(): void {
  }

  Login()
  {
    this.userService.Login(this.userId, this.password).subscribe((returnedToken)=>{
      console.log(returnedToken);
      this.authGuardService.SetUserLoggedIn(returnedToken.token);
      alert("Login Successful!");
      this.router.navigate(['/viewpost']);
      this.errorMsg ='';
    }, (error)=>{
      console.log(error);
      this.errorMsg = error.error.messsage;
    });
  }

}
