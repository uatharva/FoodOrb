import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Dish } from '../models/dish';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  name:string;
  id:any;
  product:Dish=new Dish();
  constructor(private _authGuard:AuthGuard, private _httpClient: HttpClient, private _route: ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    this.name= LoginComponent.uname;
    this.id= this._route.snapshot.paramMap.get('id');
    this._httpClient.get<Dish>("http://localhost:3000/products/" +this.id).subscribe(result =>{this.product=result}, error =>{console.log(error);})
  }

  deleteProduct(){
    this._httpClient.delete('http://localhost:3000/products/'+this.id).subscribe(result =>{
      alert("Product deleted");
      this._router.navigate(['/products']);
    }, (error)=> {
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
