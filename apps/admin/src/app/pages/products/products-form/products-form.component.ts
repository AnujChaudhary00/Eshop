import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, ProductService } from '@eweb/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  editmode=false;
  currId='';
  isSubmitted=false;
  form:FormGroup;
  categories:Category[]=[];
  imageDisplay:string| ArrayBuffer;
  constructor(private formBuilder:FormBuilder,
     private categoryService:CategoriesService
     ,private productService:ProductService,
     private messageService:MessageService,
     private location:Location,
     private router:ActivatedRoute) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode()
  }

  private _checkEditMode()
  {
    this.router.params.subscribe(res=>{
      if(res.id)
      {
        this.editmode=true;
        this.currId=res.id;
        this.productService.getSingleProduct(res.id).subscribe(product=>{
          this.ProductForm.name.setValue(product.name);
          this.ProductForm.brand.setValue(product.brand);
          this.ProductForm.category.setValue(product.category.id);
          this.ProductForm.price.setValue(product.price);
          this.ProductForm.countinstock.setValue(product.countinstock);
          this.ProductForm.isfeatured.setValue(product.isfeatured);
          this.ProductForm.description.setValue(product.description);
          this.ProductForm.richdescription.setValue(product.richdescription);
          this.ProductForm.category.setValue(product.category);
          this.imageDisplay=product.image;
          this.ProductForm.image.setValidators([]);
          this.ProductForm.image.updateValueAndValidity();
        })
      }
    })
  }

  private _initForm()
  {
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      brand:['',Validators.required],
      price:['',Validators.required],
      category:['',Validators.required],
      countinstock:['',Validators.required],
      description:['',Validators.required],
      richdescription:[''],
      image:['',Validators.required],
      isfeatured:[false],
    })
  };

  private _addProduct(productData:FormData)
  {
    this.productService.createProduct(productData).subscribe((res)=>{
      this.messageService.add({ severity:'success',
       summary: 'Success',
        detail: `Product ${res.name} is created`});
      timer(2000).toPromise().then(done=>{
        this.location.back();
      })
    },err=>{
      this.messageService.add({
         severity:'error', summary: 'Error',
          detail: 'Failed To Create Product! Please try again'+err});
    });
  }

  private _updateProduct(productFormData:FormData)
  {
    this.productService.updateProduct(productFormData,this.currId).subscribe((res)=>{
      this.messageService.add({ severity:'success',
       summary: 'Success',
        detail: `Product ${res.name} is Updated`});
      timer(2000).toPromise().then(done=>{
        this.location.back();
      })
    },err=>{
      this.messageService.add({
         severity:'error', summary: 'Error',
          detail: 'Failed To Update Product! Please try again'+err});
    });
  }

  onSubmit()
  {
    this.isSubmitted=true;
    if(this.form.invalid)
    {
      return;
    }
    const productFormData=new FormData();
    Object.keys(this.ProductForm).map(key=>{
      productFormData.append(key,this.ProductForm[key].value);
    })
      if(this.editmode)
      {
        this._updateProduct(productFormData);
      }else{
        this._addProduct(productFormData);
      }
    
    
  }

  cancel()
  {
    this.location.back();
  }

  private _getCategories()
  {
    this.categoryService.getCategories().subscribe((category)=>{
      this.categories=category;
     });
  }

  get ProductForm()
  {
    return this.form.controls;
  }

  onImageUpload(event)
  {
    const file=event.target.files[0];
    if(file)
    {
      this.form.patchValue({image:file});
      this.form.get('image').updateValueAndValidity();
      const fileReader= new FileReader();
     
      fileReader.onload=()=>{
        this.imageDisplay=fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

}
