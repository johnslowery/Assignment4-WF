import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Posts } from '../auth/models/posts';
import { PostsService } from '../auth/services/posts.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  newPost: Posts;
  errorMsg: string='';
  constructor(private postService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.newPost = new Posts();
  }

  

  CreateNewPost(){
    this.postService.CreateNewPost(this.newPost).subscribe((returnedPost)=>{
      console.log(returnedPost);
      this.router.navigate(['/viewpost']);
    },(error)=>{
      console.log(error);
      this.errorMsg = error.error.messsage;
    });
  }

}
