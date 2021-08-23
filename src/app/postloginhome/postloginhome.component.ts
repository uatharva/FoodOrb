import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Customer } from '../models/customer';
import { Dish } from '../models/dish';
import { AuthGuard } from '../services/auth-guard.services';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-postloginhome',
  templateUrl: './postloginhome.component.html',
  styleUrls: ['./postloginhome.component.css'],
  providers:[ProductService]
})
export class PostloginhomeComponent implements OnInit {

  productList: Dish[]=[];
  productListId: number[]=[];
  message: string="";
  sum:number=0;
  searchstring: string='';
  updatedProducts: Dish[]=[];

  customer: Customer= new Customer(); //for getting name of user to print on dropdown
  products: Array<Dish> =[];

  queryParams: any = {};    

  showProducts: boolean=false;

  constructor(private _productService: ProductService, private _authGuard: AuthGuard, private _router:Router, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    LoginComponent.userid= parseInt(window.localStorage.getItem("userid"));
    LoginComponent.uname=window.localStorage.getItem("uname");
    this._httpClient.get<Customer>('http://localhost:3000/users/'+LoginComponent.userid).subscribe(result=>{
      this.customer=result;
    }, error => {
      console.log(error);
    })
    this.message=this._productService.getMessage();
    this._productService.getProducts().subscribe(result => {
    this.products=result;
    this.updatedProducts=result;
    }, error => {console.log(error)});

  }

  onKeyUpEvent(event: any){
    this.updatedProducts=[];
  //   if (event.key == 'Backspace') {

  // } 
    this.searchstring=event.target.value;
    if(this.searchstring===" "){
      this.updatedProducts=this.products;
    }
    else{
      this.updatedProducts=[];
      this.searchstring=this.searchstring.toLowerCase();
      this.products.forEach(element => {
        if(element.dishName.toLowerCase().includes(this.searchstring)){
          this.updatedProducts.push(element);
        }
      });
    }
    
 }

  gotoCheckout(){
    this.productList.forEach(element => {
      this.productListId.push(element.id);
    });
    this.queryParams.myArray = JSON.stringify(this.productListId);
    const navigationExtras: NavigationExtras = {
      queryParams:this.queryParams
    };
    this._router.navigate(['/postloginhome/cart'], navigationExtras);
  }
  

  logout(){
    this._authGuard.logout();
    window.location.reload();
    window.localStorage.removeItem("uname");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("orders");
  }

  addToCart(product){
    this.productList.push(product);
  }

}
