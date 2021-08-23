import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Customer } from '../models/customer';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customer: Customer=new Customer();

  constructor(private _httpClient: HttpClient, private _authGuard:AuthGuard) { }

  ngOnInit(): void {
    LoginComponent.userid= parseInt(window.localStorage.getItem("userid"));
    LoginComponent.uname=window.localStorage.getItem("uname");
    this._httpClient.get<Customer>('http://localhost:3000/users/'+LoginComponent.userid).subscribe(result=>{
      this.customer=result;
    }, error => {
      console.log(error);
    })
  }

  logout(){
    this._authGuard.logout();
    window.location.reload();
    window.localStorage.removeItem("uname");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("orders");
  }

}
