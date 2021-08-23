import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Dish } from '../models/dish';
import { AuthGuard } from '../services/auth-guard.services';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[ProductService]
})
export class CartComponent implements OnInit {

  cart: any;
  productListId: number[]=[];
  products: Dish[]=[];
  productscart: Dish[]=[];
  sum: number;
  name: string;

  constructor(private _authGuard: AuthGuard, private _productService: ProductService, private _router: Router, private _route: ActivatedRoute, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    LoginComponent.userid= parseInt(window.localStorage.getItem("userid"));
    LoginComponent.uname=window.localStorage.getItem("uname");
    this.name=LoginComponent.uname;
    this.cart= this._route.snapshot.queryParamMap.get('myArray');
    this.productListId = JSON.parse(this.cart);
    this.productListId.sort();   
    this._productService.getProducts().subscribe(result => { this.products=result;
      for (let index = 0; index < this.productListId.length; index++) {
        for (let index1 = 0; index1 < this.products.length; index1++) {
          if(this.products[index1].id==this.productListId[index]){
            this.productscart.push(this.products[index1]);
            break;
          }
        }
      };
  }, error => {console.log(error)});
  }

  confirmOrder(){
    window.localStorage.setItem("orders", JSON.stringify(this.productscart));
    alert("Order confirmed");
    this._router.navigate(["/postloginhome/orders"]);
  }

  onDelete(id){
    for (var i = this.productscart.length - 1; i >= 0; --i) {
      if (this.productscart[i].id == id) {
          this.productscart.splice(i,1);
          break;
      }
  }
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
