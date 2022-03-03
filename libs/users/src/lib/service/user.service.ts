import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Users } from '../models/user';
import { Observable } from 'rxjs';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  apiURLUsers=environment.api_URL+'/users';

  getUsers():Observable<Users[]>
  {
    return this.http.get<Users[]>(this.apiURLUsers);
  }

  getSingleUser(userId:string):Observable<Users>
  {
    return this.http.get<Users>(`${this.apiURLUsers}/${userId}`);
  }

  createUser(user:Users):Observable<Users>{
    return this.http.post<Users>(this.apiURLUsers,user);
  }

  deleteUser(userid:string):Observable<any>{
    return this.http.delete<any>(`${this.apiURLUsers}/${userid}`);
  }

   updateUser(user:Users,userid:string):Observable<Users>{
    return this.http.put<Users>(`${this.apiURLUsers}/${userid}`,user);
  }

  getCount()
  {
    return this.http.get<any>(`${this.apiURLUsers}/get/count`);
  }

}
