import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {StyleClassModule} from 'primeng/styleclass';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ColorPickerModule} from 'primeng/colorpicker'
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {TagModule} from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import {FieldsetModule} from 'primeng/fieldset'

import { CategoriesService } from '@eweb/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderDeatilsComponent } from './pages/orders/order-deatils/order-deatils.component';

const UX_MODULE=[
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  StyleClassModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule
]

const routes:Routes=[
  {
    path:'',
    component:ShellComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },{
        path:'categories',
        component:CategoriesListComponent
      },
      {
        path:'categories/form',
        component:CategoriesFormComponent
      },
      {
        path:'categories/form/:id',
        component:CategoriesFormComponent
      },
      {
        path:'products',
        component:ProductsListComponent
      },
      {
        path:'products/form',
        component:ProductsFormComponent
      },
      {
        path:'products/form/:id',
        component:ProductsFormComponent
      },
      {
        path:'users',
        component:UserListComponent
      },
      {
        path:'users/form',
        component:UserFormComponent
      },
      {
        path:'users/form/:id',
        component:UserFormComponent
      },
      { 
       path:'orders',
       component:OrderListComponent
      },
      {
        path:'orders/:id',
        component:OrderDeatilsComponent
      }
    ]
  }
]

@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent,
     CategoriesListComponent, CategoriesFormComponent, ProductsListComponent,
      ProductsFormComponent, UserListComponent, UserFormComponent, OrderListComponent, OrderDeatilsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ...UX_MODULE,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CategoriesService,MessageService,ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
