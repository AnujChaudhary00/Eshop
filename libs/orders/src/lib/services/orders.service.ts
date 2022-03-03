import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { Observable } from 'rxjs';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private http:HttpClient) { }
   apiURLOrders=environment.api_URL+'/orders';
  getOrders():Observable<Order[]>
  {
    return this.http.get<Order[]>(this.apiURLOrders);
  }

  getSingleOrder(orderId:string):Observable<Order>
  {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(this.apiURLOrders,order);
  }

  deleteOrder(orderid:string):Observable<any>{
    return this.http.delete<any>(`${this.apiURLOrders}/${orderid}`);
  }

   updateOrder(status:{status:string},orderid:string):Observable<Order>{
    return this.http.put<Order>(`${this.apiURLOrders}/${orderid}`,status);
  }

  getCount()
  {
    return this.http.get<any>(`${this.apiURLOrders}/get/count`);
  }

  getSales(){
   return this.http.get<any>(`${this.apiURLOrders}/get/totalsales`);
  }
}
