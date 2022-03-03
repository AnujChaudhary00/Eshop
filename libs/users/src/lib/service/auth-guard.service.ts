import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private localstorageservice:LocalstorageService,private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)
  {
    const token=this.localstorageservice.getItem('token');
    if(token)
    {
      const decodetoken=JSON.parse(atob(token.split('.')[1]));
     if(decodetoken.isadmin)
     {
       return true;
     }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
