import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Customer } from '../models/customer';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  customer: Customer= new Customer();
  check:boolean=false;

  constructor(private _httpClient: HttpClient, private _authGuard: AuthGuard, private _router:Router) { }

  ngOnInit(): void {
    console.log(this.check);
    LoginComponent.userid= parseInt(window.localStorage.getItem("userid"));
    LoginComponent.uname=window.localStorage.getItem("uname");
    this._httpClient.get<Customer>('http://localhost:3000/users/'+LoginComponent.userid).subscribe(result=>{
      this.customer=result;
      console.log(this.customer);
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

  checkUpdate(){
    if(this.check==false){
      this.check=true;
    }
    else{
      this.check=false;
    }
  }

  updateAddress(){
    this._httpClient.put('http://localhost:3000/users/'+LoginComponent.userid,this.customer).subscribe(result=>{
      alert('Address Updated');
      this._router.navigate(['/postloginhome/settings']);
    }, error=>{
      console.log(error);
    })
  }

  updatePayment(){
    this._httpClient.put('http://localhost:3000/users/'+LoginComponent.userid,this.customer).subscribe(result=>{
      alert('Payment Updated');
      this._router.navigate(['/postloginhome/settings']);
    }, error=>{
      console.log(error);
    })
  }

  deletePayment(){
    this.customer.payment='';
    this._httpClient.put('http://localhost:3000/users/'+LoginComponent.userid,this.customer).subscribe(result=>{
      alert('Payment Deleted');
      this._router.navigate(['/postloginhome/settings']);
    }, error=>{
      console.log(error);
    })
  }

  deleteAddress(){
    this.customer.address='';
    this._httpClient.put('http://localhost:3000/users/'+LoginComponent.userid,this.customer).subscribe(result=>{
      alert('Address Deleted');
      this._router.navigate(['/postloginhome/settings']);
    }, error=>{
      console.log(error);
    })
  }

}
