import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../Services/category.service';
import { response } from 'express';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  model:AddCategoryRequest;

  constructor(private CategoryService: CategoryService){
    this.model={
      name:'',
      urlHandel:''
    };
  }
  onFormSubmit()
  {
    //console.log(this.model);
    this.CategoryService.addCategory(this.model)
    .subscribe({
      next : (response) => {
        console.log('This was successfull')
      }
    })
  }
}
