import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { Router } from '@angular/router';
import { UserService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  check:boolean=false;

  user: Customer= new Customer();

  customer: Customer[]=[];

  constructor(private _authGuard:AuthGuard, private _router:Router, private _userService: UserService, private _httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  logout(){
    this._authGuard.logout();
    window.location.reload();
    window.localStorage.removeItem("uname");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("orders");
  }

  register(){
      this._userService.getUsers().subscribe(result =>{this.customer=result;

    for (let index = 0; index < this.customer.length; index++) {
      if(this.customer[index].usermail==this.user.usermail){
        this.check=true;
      }
    }
    if(this.check==false){
      this._httpClient.post('http://localhost:3000/users', this.user).subscribe(result => {
      alert("Registered successfully");
      this._router.navigate(['login']);
    } , error => {console.log(error)});
  } else{
    alert("Registration failed because email already exists, try again");
  }; error => {console.log(error)};
  })
  }
}
