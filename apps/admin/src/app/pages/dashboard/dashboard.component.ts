import { Component, OnInit } from '@angular/core';
import {OrdersService} from '@eweb/orders';
import {UserService} from '@eweb/users';
import {ProductService} from '@eweb/products';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(private orderService:OrdersService,
    private userService:UserService,
    private productService:ProductService) { }

    orderCount;
    userCount;
    totalSales;
    productCount;
  ngOnInit(): void {
    this.orderService.getCount().subscribe(data=>{
      this.orderCount=data.orderCount;
    });

    this.userService.getCount().subscribe(data=>{
      this.userCount=data.userCount;
    });

    this.productService.getCount().subscribe(data=>{
      this.productCount=data.productCount;
    });

    this.orderService.getSales().subscribe(data=>{
      this.totalSales=data.totalsales;
    })
  }





}
