import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../Services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramSubscription?: Subscription;
  category?: Category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {

  }

  // ngOnInit(): void {
  //   this.paramSubscription = this.route.params.subscribe(params=>{
  //     this.id = params['id'];
  //   })
  // }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          // Fetch the category details using the id
          this.categoryService.getCategoryById(this.id)
            .subscribe({
              next: (response) => {
                this.category = response;
              }
            })
        }
        error: (err: any) => {
          console.error('Error fetching route parameters', err);
        }
      }
    })
  }

  onFormSubmit():void{
    console.log(this.category);
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }

}
