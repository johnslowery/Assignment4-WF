import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../models/token.model';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL='https://unf.josecgomez.dev';
  constructor(private http: HttpClient) {}

  currentUser = new User();

    CreateNewUser(createdUser: User)
    {
      return this.http.post<User>(`${this.BASE_URL}/Users`, createdUser);
    }

    Login(userName:string, password:string)
    {
      return this.http.get<Token>(`${this.BASE_URL}/Users/${userName}/${password}`);
    }

    GetLoggedInUser(): Token|null
    {
      const authToken = localStorage.getItem('AuthToken');
      if (authToken !== null) {
        const currentToken = new Token();
        Object.assign(currentToken, JSON.parse(authToken));
        return currentToken;
      }
      else {
        return null;
      }
    }
   
}
