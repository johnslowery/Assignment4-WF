import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Posts } from '../models/posts';
import { Token } from '../models/token.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  BASE_URL='https://unf.josecgomez.dev';

  constructor(private http: HttpClient, private userSvc: UserService) {}
  
    CreateNewPost(newPost: Posts)
    {
      const currentUser = this.userSvc.GetLoggedInUser();
      return this.http.post<Posts>(`${this.BASE_URL}/Posts`, newPost, {headers: new HttpHeaders().set('Authorization', `Bearer ${currentUser.token}`)});
    }
    ListAllPosts()
    {
      return this.http.get<Posts[]>(`${this.BASE_URL}/Posts`);
    }

    Delete(post: Posts): Observable<any>
    {
      const currentUser = this.userSvc.GetLoggedInUser();
      return this.http.delete(`${this.BASE_URL}/Posts/${post.postId}`, {headers: new HttpHeaders().set('Authorization', `Bearer ${currentUser.token}`)});
    }

    UpdatePost(post: Posts): Observable<Posts>
    {
      const currentUser = this.userSvc.GetLoggedInUser();
      return this.http.patch<Posts>(`${this.BASE_URL}/Posts/${post.postId}`, post, {headers: new HttpHeaders().set('Authorization', `Bearer ${currentUser.token}`)});
    }

    GetPost(postId: number): Observable<Posts>
    {
      const currentUser = this.userSvc.GetLoggedInUser();
      return this.http.get<Posts>(`${this.BASE_URL}/Posts/${postId}`, {headers: new HttpHeaders().set('Authorization', `Bearer ${currentUser.token}`)});
    }

}
