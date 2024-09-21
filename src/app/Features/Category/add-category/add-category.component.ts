import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  model:AddCategoryRequest;

  constructor(){
    this.model={
      name:'',
      urlHandel:''
    };
  }
  onFormSubmit()
  {
    console.log(this.model);
  }
}
