import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService { 

  constructor(private http:HttpClient) { }
   apiURLCategories=environment.api_URL+'/products';
   
  getProducts(categoryFilter?:string[]):Observable<Product[]>
  {
    let params=new HttpParams();
    if(categoryFilter)
    {
      params=params.append('categories',categoryFilter.join(','));
      return this.http.get<Product[]>(`${this.apiURLCategories}/byCategory`,{params:params});
    }
    return this.http.get<Product[]>(this.apiURLCategories,{params:params});
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

  getCount()
  {
    return this.http.get<any>(`${this.apiURLCategories}/get/count`);
  }

   getFeaturedProducts(count:number):Observable<Product[]>{
     return this.http.get<Product[]>(`${this.apiURLCategories}/get/featured/${count}`)
   }
}
