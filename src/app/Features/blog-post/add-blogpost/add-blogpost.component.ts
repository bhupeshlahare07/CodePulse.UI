import { Component, OnInit } from '@angular/core';
import { AddBlogpost } from '../models/add-blogpost.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../Category/Services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../Category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit {
  model: AddBlogpost;
  categorys$?: Observable<Category[]>;

  constructor(private blogpostservise:BlogPostService, private router:Router, private categoryservice:CategoryService) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),
      isvisible: true,
      categories: []
    };
  }
  ngOnInit(): void {
    this.categorys$ = this.categoryservice.getAllCategories();
  }
  onSubmit(): void {
    console.log(this.model);
    this.blogpostservise.createBlogPost(this.model)
    .subscribe({
      next:(response)=>{
      this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }

}
