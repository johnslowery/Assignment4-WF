import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Posts } from '../auth/models/posts';
import { User } from '../auth/models/user';
import { PostsService } from '../auth/services/posts.service';
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  
  @Input('currentPost') currentPost: Posts[]=[];
  @Input('currentUser') currentUser: User;
  @Input() post: Posts;
  @Input() selectedPostId: Number;

  constructor(private postService: PostsService, private userSvc: UserService, private router: Router) { }

  postsArray: Posts[];
  postList: Posts;
  savedPost: Posts;
  errorMsg: string='';
  
  ngOnInit(): void {
    this.ShowPosts();
    this.savedPost = new Posts();
    this.selectedPostId = undefined;
  }

  ShowPosts(){
    const currentUser = this.userSvc.GetLoggedInUser();
    if(currentUser !== null){
      this.currentUser = currentUser.UserData;
    }
    this.postService.ListAllPosts().subscribe((returnedPost)=>{
      this.postsArray = returnedPost;
      var x;
      var y = this.postsArray.length - 1;
      for(x = 0; x < this.postsArray.length; x++){
        this.currentPost[x] = this.postsArray[y];
        y--;
      }
    });
  }

  EditPost(editedPost: Posts){
    editedPost.title = this.savedPost.title;
    editedPost.content = this.savedPost.content;
    editedPost.headerImage = this.savedPost.headerImage;
    this.postService.UpdatePost(editedPost).subscribe((returnedPost)=>{
      console.log(returnedPost);
    });
    this.selectedPostId = undefined;
  }

  SavePost(savedPost: Posts){
    this.post = savedPost;
    this.selectedPostId = this.post.postId;
  }

  DeletePost(selectedPost: Posts){
    if(confirm("Are you sure you want to delete this post?")){
      this.postService.Delete(selectedPost).subscribe((returnedPost)=>{
        console.log(returnedPost);
        this.ShowPosts();
      });
    }
  }
}
