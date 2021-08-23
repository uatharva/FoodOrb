import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  static userid: number;
  static uname: string;
  
  check: boolean=false;

  user: any={
    usermail:'',
    password:''
  };

  customer: Customer[]=[];

  constructor(private _router: Router, private _httpClient: HttpClient, private _userService: UserService) { }

  ngOnInit(): void {
  }

  login(){

    this._userService.getUsers().subscribe(result => { this.customer=result;

    for (let index = 0; index < this.customer.length; index++) {
      if(this.customer[index].usermail==this.user.usermail){
        if(this.customer[index].password==this.user.password){
          LoginComponent.uname= this.customer[index].name;
          LoginComponent.userid= this.customer[index].id;
          window.localStorage.setItem("userid",LoginComponent.userid as any);
          window.localStorage.setItem("uname",LoginComponent.uname as any);
          this.check=true;
          break;
        }
      }
      
    }
    console.log(LoginComponent.userid);
    if(this.check==true){
      localStorage.setItem('isLoggedIn','true');
      alert("Logged in successfully");
      this._router.navigate(['/postloginhome']);
    } else{
      alert("Login failed, try again");
    } }, error => {console.log(error)});
  }

}
 
