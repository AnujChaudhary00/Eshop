import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }


  setitem(name:string,data:any)
  {
    localStorage.setItem(`${name}`,data);
  }

  getItem(name:string)
  {
    return localStorage.getItem(`${name}`);
  }

  removeItem(name:string)
  {
    localStorage.removeItem(`${name}`);
  }
}
