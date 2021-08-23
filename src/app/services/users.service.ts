import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Customer } from "../models/customer" 

@Injectable()
export class UserService{

    constructor(private _httpClient: HttpClient){}

    getUsers() : Observable<Customer[]>{
        return this._httpClient.get<Customer[]>("http://localhost:3000/users")
    }
}