import { Injectable } from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import {Users} from '@eweb/users';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLUsers=environment.api_URL+'/users';

  constructor(private http:HttpClient,private localservice:LocalstorageService,
    private router:Router) { }

  login(email:string, password:string):Observable<Users>
  {
    return this.http.post<Users>(`${this.apiURLUsers}/login`,{email:email,password:password});
  }

  isAdmin(token:any)
  {
   
    if(token)
    {
      console.log(token)
      const decodetoken=JSON.parse(atob(token.split('.')[1]));
      console.log(decodetoken)
     if(decodetoken.isadmin)
     {
       return true;
     }
    }
    return false;
  }

  logout()
  {
    this.localservice.removeItem('token');
    this.router.navigate(['/login']);
  }
}
