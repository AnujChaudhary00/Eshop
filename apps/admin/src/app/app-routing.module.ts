import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@eweb/users';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderDeatilsComponent } from './pages/orders/order-deatils/order-deatils.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { ShellComponent } from './shared/shell/shell.component';


const routes:Routes=[
    
    {
      path:'',
      component:ShellComponent,
      canActivate:[AuthGuard],
      children:[
        {
          path:'',
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
    },
    {
        path:"**",
        redirectTo:'',
        pathMatch:'full'
    }
  ]
  

@NgModule({
    imports: [   RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }
