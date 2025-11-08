import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blogpost.model';
import { CategoryService } from '../../Category/Services/category.service';
import { Category } from '../../Category/models/category.model';
import { UpdateBlogpost } from '../models/update-blogpost.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id:string | null = '';
  model?: BlogPost
  categories$:Observable<Category[]> | undefined
  selectedCategories:string[] = [];
  isImageSelectorVisible: boolean = false;

  routeSubscription?: Subscription;
  updateBlogpostSubscription?: Subscription;
  deleteBlogpostSubscription?: Subscription;


  constructor(private route:ActivatedRoute, private blogPostService:BlogPostService, private categoryService:CategoryService,
    private router:Router
  ){
        
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      if(this.id){
        this.blogPostService.getBlogPostById(this.id).subscribe({
          next:(response) => {
            this.model = response; 
            this.selectedCategories = this.model.categories.map(c => c.id);
            console.log(this.model);
          }
        });
      }
    });
  }

  onSubmit(): void {
    console.log(this.model);
    if(this.model && this.id){
      var updateBlogPost: UpdateBlogpost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isvisible: this.model.isvisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
    }
      this.updateBlogpostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next:(response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
  }
}

  onDelete(): void {
    if(this.id){
      this.deleteBlogpostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  hideImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
  
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogpostSubscription?.unsubscribe();
    this.deleteBlogpostSubscription?.unsubscribe();
  }
}
