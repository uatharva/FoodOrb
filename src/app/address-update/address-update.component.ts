import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.css']
})
export class AddressUpdateComponent implements OnInit {

  id:any;
  customer: Customer= new Customer();

  constructor(private _route: ActivatedRoute, private _httpClient: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.id= this._route.snapshot.paramMap.get('id');
    this._httpClient.get<Customer>('http://localhost:3000/users/'+this.id).subscribe(result=>{
      this.customer=result;
    }, error => {
      console.log(error);
    })
  }

  updateAddress(){
    this._httpClient.put('http://localhost:3000/users/'+this.id,this.customer).subscribe(result=>{
      alert('Address Updated');
      this._router.navigate(['/postloginhome/settings']);
    }, error=>{
      console.log(error);
    })
  }

}
