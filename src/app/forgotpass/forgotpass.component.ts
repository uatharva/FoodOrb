import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  user: Customer= new Customer();

  customer: Customer[]=[];  check:boolean=false;
  id: number;

  constructor(private _router: Router, private _userService: UserService, private _httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  checkUser(){
    this._userService.getUsers().subscribe(result =>{this.customer=result;

      for (let index = 0; index < this.customer.length; index++) {
        if(this.customer[index].usermail==this.user.usermail){
          this.check=true;
          this.user.name= this.customer[index].name;
          this.user.usermail= this.customer[index].usermail;
          this.user.password= this.customer[index].password;
          this.user.address= this.customer[index].address;
          this.user.contact= this.customer[index].contact;
          this.user.payment= this.customer[index].payment;
          this.user.profession= this.customer[index].profession;
          this.id=this.customer[index].id;
          break;
        }
        else{
          this.check=false;
        }
      }
      if(this.check==false){
        alert("No such email exists");
      }; error => {console.log(error)};
  })
  }

  updateUser(){
    if(this.check==true){

      this._httpClient.put('http://localhost:3000/users/'+this.id,this.user).subscribe(result=>{
      alert("Password changed successfully");
      this._router.navigate(['/login']);
      }, error=>{
        console.log(error);
      })
  }
}

}
