import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@eweb/orders';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import {ORDER_STATUS} from '../order.constants';


@Component({
  selector: 'admin-order-deatils',
  templateUrl: './order-deatils.component.html',
  styles: [
  ]
})
export class OrderDeatilsComponent implements OnInit {

  constructor(private OrderService:OrdersService,private route:ActivatedRoute,
    private messageService:MessageService,private location:Location) { }
  order:Order;
  orderStatus=[];
  selectedStat:any;
  ngOnInit(): void {
    this._getOrder();
    this._getOrderStatus();
  }


 private _getOrderStatus()
 {
   this.orderStatus=Object.keys(ORDER_STATUS).map(key=>{
     return {
       id:key,
       name:ORDER_STATUS[key].label
     }
   })
 }

  private _getOrder()
  {
    this.route.params.subscribe(params=>{
      if(params.id)
      {
        this.OrderService.getSingleOrder(params.id).subscribe(res=>{
          this.order=res;
          console.log(this.order);
        });
      }
    })
   
  }

  onStatusChange(event)
  {
    console.log(event);
    this.OrderService.updateOrder({status:event.value},this.order.id).subscribe((res)=>{
      this.messageService.add({ severity:'success',
       summary: 'Success',
        detail: 'Order Status is Updated'});
      timer(2000).toPromise().then(done=>{
        this.location.back();
      })
    },err=>{
      this.messageService.add({
         severity:'error', summary: 'Error',
          detail: 'Failed To update Order Status! Please try again'});
    });
  }



}
