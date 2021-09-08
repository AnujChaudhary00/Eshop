import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from '@eweb/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  constructor(private productService:ProductService,
    private route:Router,
   private confirmationService:ConfirmationService,
   private messageService:MessageService) { }
  products=[];
  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts()
  {
    this.productService.getProducts().subscribe(products=>{
      this.products=products;
      console.log(this.products);
    })
  }

  deleteProduct(productId)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete This Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe(res=>{
          this.messageService.add({ severity:'success',
          summary: 'Success',
           detail: 'Product is deleted Successfully'});
           this._getProducts();
        },res=>{
          this.messageService.add({
            severity:'error', summary: 'Error',
             detail: 'Failed To delete Product! Please try again'});
        })
      },
     
  });
      
  }

  updateProduct(productid)
  {
    this.route.navigateByUrl(`products/form/${productid}`);
  }

}
