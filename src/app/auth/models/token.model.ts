import { User } from '../models/user';


export class Token {
  token = '';
  UserData: User;
  iat: number;
  exp: number;
  sub: string;

}
