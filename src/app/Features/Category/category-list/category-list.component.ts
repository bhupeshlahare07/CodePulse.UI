import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../Services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{

  // categories?:Category[];
  categories$?: Observable<Category[]>
  
  constructor(private categoryService:CategoryService){

   }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    // .subscribe({
    //   next : (response) => {
    //     this.categories = response;
    //   }
    // })
  }
 onDelete(id: string): void {
  if (confirm('Are you sure you want to delete this category?')) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        console.log('Category deleted successfully:', id);
        // refresh list or remove item from local array
        this.categories$ = this.categoryService.getAllCategories();
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      }
    });
  }
}

}
