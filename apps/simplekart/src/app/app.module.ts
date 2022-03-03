import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {UiModule} from '@eweb/ui';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import {ProductsModule} from '@eweb/products';
import { HttpClientModule } from '@angular/common/http';

const routes:Routes=[
{
  path:'', component:HomePageComponent
},
]

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
  imports: [BrowserModule,RouterModule.forRoot(routes),UiModule,AccordionModule,HttpClientModule,
    BrowserAnimationsModule,ProductsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
