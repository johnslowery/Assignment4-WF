import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private authGuardService: AuthGuardService) { }
  userLoggedIn:boolean=false;
  ngOnInit(): void {
    this.authGuardService.UserStateChanged.subscribe((userState)=>{
      this.userLoggedIn = userState;
    })
  }

  LogOutUser()
  {
    this.authGuardService.LogoutUser();
    this.router.navigate(['/login']);
  }

}
