import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth/models/user'
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  createdUser: User;
  errorMsg='';
  ngOnInit(): void {
    this.createdUser = new User();
  }

  CreateNewUser()
  {
    this.userService.CreateNewUser(this.createdUser).subscribe((returnedUser)=>{
      console.log(returnedUser);
      this.router.navigate(['/login', {currentUserId: returnedUser.userId}]);
      this.errorMsg ='';
    }, (error)=>{
      console.log(error);
      this.errorMsg = error.error.messsage;
    });
  }

}
