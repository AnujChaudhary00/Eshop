import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
const routes:Routes=[
  {
    path:'login',
    component:LoginComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),InputTextModule,ButtonModule,FormsModule,ReactiveFormsModule],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
})
export class UsersModule {}
