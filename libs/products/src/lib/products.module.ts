import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import { ProductListComponent } from './pages/product-list/product-list.component';
import {  RouterModule, Routes } from '@angular/router';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import {UiModule} from '@eweb/ui'

const routes:Routes=[
  {
    path:'products',
    component:ProductListComponent
  },
   {
    path:'category/:categoryid',
    component:ProductListComponent
  },
  {
    path:'products/:productid',
    component:ProductPageComponent
  }
]

@NgModule({ 
  imports: [CommonModule,
    ButtonModule,
    CarouselModule,
    CheckboxModule,
    RouterModule.forChild(routes),
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule  
  ], declarations: [ProductsSearchComponent, CategoryComponent, ProductItemComponent, FeaturedProductsComponent, ProductListComponent, ProductPageComponent],
  exports:[ProductsSearchComponent,CategoryComponent, ProductItemComponent, FeaturedProductsComponent, ProductListComponent, ProductPageComponent]
})
export class ProductsModule {}
