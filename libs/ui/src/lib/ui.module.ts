import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import {ButtonModule} from 'primeng/button';
import { GalleryComponent } from './component/gallery/gallery.component';

@NgModule({
  imports: [CommonModule, RouterModule,ButtonModule],
  declarations: [
    BannerComponent,
    SliderComponent,
    GalleryComponent
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    GalleryComponent
  ],
})
export class UiModule {}
