import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '@eweb/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'eweb-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

 
  featuredProducts:any[]=[];
  endSubs$:Subject<any>= new Subject();

  responsiveOptions:any;

  constructor(private prodService:ProductService) {

    this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
   }

  ngOnInit(): void {
    this._getFeaturedProducts()
  }

  private _getFeaturedProducts()
  {
    this.prodService.getFeaturedProducts(4).pipe(takeUntil(this.endSubs$)).subscribe(data=>{
      console.log(data)
      this.featuredProducts=data;
    })
  }


  ngOnDestroy():void{
    this.endSubs$.next();
      this.endSubs$.complete()
  }

}
