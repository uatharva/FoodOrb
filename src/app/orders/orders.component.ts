import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Dish } from '../models/dish';
import { AuthGuard } from '../services/auth-guard.services';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers:[ProductService]
})
export class OrdersComponent implements OnInit {

  cart: any;
  productListId: number[]=[];
  products: Dish[]=[];
  productscart: Dish[]=[];
  sum: number;
  name: string;
  temp: string;

  constructor(private _authGuard: AuthGuard, private _productService: ProductService, private _router: Router, private _route: ActivatedRoute, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.name=window.localStorage.getItem("uname");
    this.temp= window.localStorage.getItem("orders");
    this.productscart= JSON.parse(this.temp);
    
  }

  cancelOrder(){
    alert("Order has been cancelled");
    window.localStorage.removeItem("orders");
    this._router.navigate(["/postloginhome"]);
  }

  logout(){
    this._authGuard.logout();
    window.location.reload();
    window.localStorage.removeItem("uname");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("orders");
  }

  total(){
    this.sum=0;
    for (let index = 0; index < this.productscart.length; index++) {
      this.sum+=this.productscart[index].cost;
    }
    return this.sum;
  }  

}
