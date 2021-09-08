import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }
   apiURLCategories=environment.api_URL+'/categories';
  getCategories():Observable<Category[]>
  {
    return this.http.get<Category[]>(this.apiURLCategories);
  }

  getSingleCategory(categoryId:string):Observable<Category>
  {
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
  }

  createCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(this.apiURLCategories,category);
  }

  deleteCategory(categoryid:string):Observable<any>{
    return this.http.delete<any>(`${this.apiURLCategories}/${categoryid}`);
  }

   updateCategory(category:Category,categoryid:string):Observable<Category>{
    return this.http.put<Category>(`${this.apiURLCategories}/${categoryid}`,category);
  }
}
