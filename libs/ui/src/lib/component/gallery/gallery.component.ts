import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {

  selectedImageUrl?: string;
  @Input() images:string[]|undefined
  constructor() { }

  ngOnInit(): void {
    if(this.images)
      this.selectedImageUrl=this.images[0];
  }

  changeSelectedImage(imageUrl:string)
  {
    this.selectedImageUrl=imageUrl;
  }

}
