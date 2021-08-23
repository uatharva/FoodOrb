import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Dish } from "../models/dish" 

@Injectable()
export class ProductService{

    constructor(private _httpClient: HttpClient){}

    getMessage(): string{
        return "Product Mgmt System"
    }

    getProducts() : Observable<Dish[]>{
        return this._httpClient.get<Dish[]>("http://localhost:3000/products")
    }
}