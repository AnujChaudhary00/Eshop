import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '@eweb/products';
import { CategoriesService } from '../../services/categories.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'eweb-category',
  templateUrl: './category.component.html',
  styles: [
  ]
})
export class CategoryComponent implements OnInit,OnDestroy {

  categories:Category[]=[];
  $endSubs: Subject<any>=new Subject();
  constructor(private categoryService:CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().pipe(takeUntil(this.$endSubs)).subscribe(data=>{
      this.categories=data;
    })
  }

  ngOnDestroy()
  {
    this.$endSubs.next();
      this.$endSubs.complete()
  }

}
