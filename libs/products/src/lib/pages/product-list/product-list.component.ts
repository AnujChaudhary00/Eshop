import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductService } from '@eweb/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'eweb-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit,OnDestroy {

  products:Product[]=[];
  categories:Category[]=[];
  isCategoryPage?:boolean;
  endSubs$:Subject<any>=new Subject();
  constructor(private prodService:ProductService,
    private categoryService:CategoriesService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      params.categoryid ?this._getProducts([params.categoryid]):this._getProducts();
      params.categoryid ?(this.isCategoryPage=true):(this.isCategoryPage=false)
    })
    this._getCategories();
  }

  private _getProducts(categoriesFilter?:string[]){
    this.prodService.getProducts(categoriesFilter).pipe(takeUntil(this.endSubs$)).subscribe(data=>{
     
      this.products=data;
    })
  }

  private _getCategories()
  {
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(data=>{
    
      this.categories=data;
    })
  }

  categoryFilter()
  {
   const selectedcategories:any[]=this.categories.filter(category=>category.checked).map(category=>category.id);
   this._getProducts(selectedcategories);
   
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
