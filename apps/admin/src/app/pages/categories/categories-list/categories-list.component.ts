import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CategoriesService,Category} from '@eweb/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

 
  categories:Category[]=[]

  constructor(private categoriesService:CategoriesService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private route:Router,
    private location:Location) { }

  ngOnInit(): void {
  this.getCategories();
  

}

deleteCategory(categoryId:string)
{

  this.confirmationService.confirm({
    message: 'Are you sure that you want to Delete This Category?',
    header: 'Delete Category',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.categoriesService.deleteCategory(categoryId).subscribe(res=>{
        this.messageService.add({ severity:'success',
        summary: 'Success',
         detail: 'Category is deleted Successfully'});
         this.getCategories();
      },res=>{
        this.messageService.add({
          severity:'error', summary: 'Error',
           detail: 'Failed To delete Category! Please try again'});
      })
    },
   
});
  
 
}

        updateCategory(categoryId:string)
        {
          this.route.navigateByUrl(`categories/form/${categoryId}`);
        }

private getCategories()
{
  this.categoriesService.getCategories().subscribe(res=>{
    this.categories=res;
  }
)
}

}
