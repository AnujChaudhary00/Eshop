import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@eweb/users';
import { AuthService } from '../../service/auth.service';
import { LocalstorageService } from '../../service/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private auth:AuthService,
    private localstorageservice:LocalstorageService,
    private router:Router) { }

  loginform:FormGroup;
  isSubmitted=false;
  authError=false;
  authMessage="Either Email or Password is invalid"
  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm()
  {
    this.loginform=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  get logForm(){
    return this.loginform.controls;
  }

  submit()
  {
    this.isSubmitted=true;
    
    this.auth.login(this.logForm.email.value,this.logForm.password.value).subscribe(data=>{
     this.authError=false;
     if(this.auth.isAdmin(data.token))
     {
        this.localstorageservice.setitem('token',data.token);
     }else
     {
       alert("You are not admin! Please sign in as a Buyer Portal");
     }
     this.router.navigate(['/']);
    },(error:HttpErrorResponse)=>{
      this.authError=true;
      
      if(error.status!==400)
      {
        this.authMessage="Error in the Server! Please try again after a while"
      }
    })
  }

}
