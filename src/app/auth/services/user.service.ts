import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiToken } from '../models/token.model';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL='https://unf.josecgomez.dev';
  constructor(private http: HttpClient) {}

    CreateNewUser(createdUser: User)
    {
      return this.http.post<User>(`${this.BASE_URL}/Users`, createdUser);
    }

    Login(userName:string, password:string){
      return this.http.get<ApiToken>(`${this.BASE_URL}/Users/${userName}/${password}`);
    }
   
}
