import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import {ProductService} from '../../services/product.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'eweb-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit,OnDestroy {

  product?:Product;
  endSubs$:Subject<any>=new Subject();
  quantity?:number;
  constructor(private prodService:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params.productid)
      {
        this._getproduct(params.productid);
      }
    })
  }

  addproductToCart()
  {

  }

  private _getproduct(productid:string)
  {
    this.prodService.getSingleProduct(productid).pipe(takeUntil(this.endSubs$)).subscribe(data=>{
      this.product=data;
      console.log(data);
    })
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
