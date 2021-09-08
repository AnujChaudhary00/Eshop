import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService { 

  constructor(private http:HttpClient) { }
   apiURLCategories=environment.api_URL+'/products';
   
  getProducts():Observable<Product[]>
  {
    return this.http.get<Product[]>(this.apiURLCategories);
  }

  getSingleProduct(productId:string):Observable<Product>
  {
    return this.http.get<Product>(`${this.apiURLCategories}/${productId}`);
  }

  createProduct(product:FormData):Observable<Product>{
    return this.http.post<Product>(this.apiURLCategories,product);
  }

  deleteProduct(productid:string):Observable<any>{
    return this.http.delete<any>(`${this.apiURLCategories}/${productid}`);
  }

   updateProduct(product:FormData,productid:string):Observable<Product>{
    return this.http.put<Product>(`${this.apiURLCategories}/${productid}`,product);
  }
}
