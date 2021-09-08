import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Order, OrdersService}  from '@eweb/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ORDER_STATUS} from '../order.constants';

@Component({
  selector: 'admin-order-list',
  templateUrl: './order-list.component.html',
  styles: [
  ]
})
export class OrderListComponent implements OnInit {

  orders:Order[]=[];
  orderStatus=ORDER_STATUS;
  constructor(private orderService:OrdersService,
    private Router:Router,
    private confirmationService:ConfirmationService,
    private location:Location,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders()
  {
    this.orderService.getOrders().subscribe(res=>{
      this.orders=res;
      console.log(this.orders);
    })
  }

  showOrder(orderId)
  {
    this.Router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete This Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(orderId).subscribe(res=>{
          this.messageService.add({ severity:'success',
          summary: 'Success',
           detail: 'Order is deleted Successfully'});
           this._getOrders();
        },res=>{
          this.messageService.add({
            severity:'error', summary: 'Error',
             detail: 'Failed To delete Order! Please try again'});
        })
      },
     
  });
    
  }

}
