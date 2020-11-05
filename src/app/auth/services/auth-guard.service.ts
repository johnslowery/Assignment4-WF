import { EventEmitter, Injectable, Output } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiToken } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  @Output() UserStateChanged = new EventEmitter<boolean>();
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const authToken = localStorage.getItem('AuthToken');
    if(authToken !== null){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }

  SetUserLoggedIn(tokenAuth:ApiToken){
    localStorage.setItem('AuthToken',JSON.stringify(tokenAuth));
    this.UserStateChanged.emit(true);
  }

  LogoutUser(){
    localStorage.removeItem('AuthToken');
    this.UserStateChanged.emit(false);
  }
}
