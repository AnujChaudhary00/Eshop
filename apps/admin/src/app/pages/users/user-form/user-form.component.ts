import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService, Users } from '@eweb/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countriesList from 'i18n-iso-countries';

declare const require;

@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styles: [
  ]
})
export class UserFormComponent implements OnInit {


  form:FormGroup;
  isSubmitted=false;
  editmode=false;
  currId='';
  countries=[];

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private messageService:MessageService,private location:Location,
    private router:ActivatedRoute) {
   }
  
  ngOnInit(): void {
    this._checkEditMode();
    this._initUserForm();
    this.__getCountries();
  }

  private __getCountries()
  {
    countriesList.registerLocale(require("i18n-iso-countries/langs/en.json"));
  this.countries= Object.entries(countriesList.getNames('en',{select:'official'})).map(entry=>{ 
    return {id:entry[0],
    name:[entry[1]]}
  });
  }

  private _initUserForm()
  {
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      passwordhash:[''],
      email:['',[Validators.required,Validators.email]],
      phone:['',Validators.required],
      isadmin:[false],
      street:[''],
      apartment:[''],
      zip:[''],
      city:[''],
      country:['']
    });
  }

  onSubmit()
  {
    this.isSubmitted=true;
    if(this.form.invalid)
    {
      return;
    }
    const user:Users={
      name:this.UserForm.name.value,
      email:this.UserForm.email.value,
      phone:this.UserForm.phone.value,
      passwordhash:this.UserForm.passwordhash.value,
      city:this.UserForm.city.value,
      country:this.UserForm.country.value,
      zip:this.UserForm.zip.value,
      street:this.UserForm.street.value,
      apartment:this.UserForm.apartment.value,
    }

    if(this.editmode)
    {
      this._updateData(user,this.currId);
    }else{
      this._createdata(user);
    }
   
  }

  private _updateData(user:Users,userid:string)
  {
    this.userService.updateUser(user,userid).subscribe((res)=>{
      this.messageService.add({ severity:'success',
       summary: 'Success',
        detail: 'User is Updated'});
      timer(2000).toPromise().then(done=>{
        this.location.back();
      })
    },err=>{
      this.messageService.add({
         severity:'error', summary: 'Error',
          detail: 'Failed To update User! Please try again'});
    });
  }

    private _createdata(user:Users)
    {
      this.userService.createUser(user).subscribe((res)=>{
        this.messageService.add({ severity:'success',
         summary: 'Success',
          detail: `User ${res.name} is created`});
        timer(2000).toPromise().then(done=>{
          this.location.back();
        })
      },err=>{
        this.messageService.add({
           severity:'error', summary: 'Error',
            detail: 'Failed To Create User! Please try again'+err});
      });
    }


  get UserForm(){
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
        this.userService.getSingleUser(res.id).subscribe(user=>{
          console.log(user);
          this.UserForm.name.setValue(user.name);
          this.UserForm.email.setValue(user.email);
          this.UserForm.city.setValue(user.city);
          this.UserForm.country.setValue(user.country);
          this.UserForm.apartment.setValue(user.apartment);
          this.UserForm.street.setValue(user.street);
          this.UserForm.isadmin.setValue(!user.isadmin);
          this.UserForm.phone.setValue(user.phone);
          this.UserForm.zip.setValue(user.zip);

          this.UserForm.passwordhash.setValidators([]);
          this .UserForm.passwordhash.updateValueAndValidity();
        })
      }
    })
  }


}
