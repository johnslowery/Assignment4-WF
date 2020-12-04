import { EventEmitter, Injectable, Output } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Token } from '../models/token.model';
import jwt_decode from 'jwt-decode';

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

  SetUserLoggedIn(currentToken: string): void{
    const decodedToken = jwt_decode<Token>(currentToken);
    console.log(decodedToken);
    const userToken = new Token();
    userToken.token = currentToken;
    userToken.UserData = decodedToken.UserData;
    userToken.iat = decodedToken.iat;
    userToken.exp = decodedToken.exp;
    userToken.sub = decodedToken.sub;
    localStorage.setItem('AuthToken', JSON.stringify(userToken));
    this.UserStateChanged.emit(true);
  }

  LogoutUser(){
    localStorage.removeItem('AuthToken');
    this.UserStateChanged.emit(false);
  }
}
