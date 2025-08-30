import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../Services/category.service';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
/* The AddCategoryComponent class in TypeScript defines a model for adding a category and includes a
method for submitting the form data to the CategoryService. */
/* This class is named AddCategoryComponent and implements the OnDestroy interface. */
export class AddCategoryComponent implements OnDestroy {

  model:AddCategoryRequest;
  private addCategorySubscription?:Subscription;

  constructor(private CategoryService: CategoryService, private router:Router) {
    this.model={
      name:'',
      urlHandel:''
    };
  }
  
  onFormSubmit()
  {
    //console.log(this.model);
    this.addCategorySubscription = this.CategoryService.addCategory(this.model)
    .subscribe({
      next : (response) => {
        // console.log('This was successfull')
        this.router.navigateByUrl('/admin/categories');
      }
    })
  }

  /**
   * The ngOnDestroy function in TypeScript unsubscribes from the addCategorySubscription if it exists.
   */
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
