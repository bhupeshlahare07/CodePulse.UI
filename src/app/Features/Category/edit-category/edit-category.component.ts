import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../Services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramSubscription?: Subscription;
  category?: Category;
  updateCategorySubscription?: Subscription;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {

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
    //console.log(this.category);
    const UpdateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name || '',
      urlHandel: this.category?.urlHandel || ''
    };

    this.updateCategorySubscription = this.categoryService.updateCategory(this.id!, UpdateCategoryRequest)
    .subscribe({
      next: (response) => {
       this.router.navigateByUrl('/admin/categories');
      }
    });

    // Pass this object to service method to update the category
    console.log(UpdateCategoryRequest);
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.updateCategorySubscription?.unsubscribe();
  }

}
