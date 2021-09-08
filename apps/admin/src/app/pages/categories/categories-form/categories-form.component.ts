import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@eweb/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form:FormGroup=this.formBuilder.group({
    name:['',Validators.required],
    icon:['',Validators.required],
    color:['#fff']
  });
  isSubmitted=false;
  editmode=false;
  currId='';

  constructor(private formBuilder:FormBuilder,
    private categoryService:CategoriesService,
    private messageService:MessageService,private location:Location,
    private router:ActivatedRoute) {
   }
  
  ngOnInit(): void {
    this._checkEditMode();
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      icon:['',Validators.required],
      color:['#fff']
    });
  }

  onSubmit()
  {
    this.isSubmitted=true;
    if(this.form.invalid)
    {
      return;
    }
    const category:Category={
      name:this.CategoryForm.name.value,
      icon:this.CategoryForm.icon.value,
      color:this.CategoryForm.color.value
    }

    if(this.editmode)
    {
      this._updateData(category,this.currId);
    }else{
      this._createdata(category);
    }
   
  }

  private _updateData(category:Category,categoryid:string)
  {
    this.categoryService.updateCategory(category,categoryid).subscribe((res)=>{
      this.messageService.add({ severity:'success',
       summary: 'Success',
        detail: 'Category is Updated'});
      timer(2000).toPromise().then(done=>{
        this.location.back();
      })
    },err=>{
      this.messageService.add({
         severity:'error', summary: 'Error',
          detail: 'Failed To update Category! Please try again'});
    });
  }

    private _createdata(category:Category)
    {
      this.categoryService.createCategory(category).subscribe((res)=>{
        this.messageService.add({ severity:'success',
         summary: 'Success',
          detail: `Category ${res.name} is created`});
        timer(2000).toPromise().then(done=>{
          this.location.back();
        })
      },err=>{
        this.messageService.add({
           severity:'error', summary: 'Error',
            detail: 'Failed To Create Category! Please try again'+err});
      });
    }


  get CategoryForm(){
    return this.form.controls;
  }

  cancel()
  {
    this.location.back();
  }

  private _checkEditMode()
  {
    this.router.params.subscribe(res=>{
      if(res.id)
      {
        this.editmode=true;
        this.currId=res.id;
        this.categoryService.getSingleCategory(res.id).subscribe(category=>{
          this.CategoryForm.name.setValue(category.name);
          this.CategoryForm.icon.setValue(category.icon);
          this.CategoryForm.color.setValue(category.color);
        })
      }
    })
  }

}
