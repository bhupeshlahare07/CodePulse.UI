import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blogpost.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id:string | null = '';
  routeSubscription?: Subscription
  model?: BlogPost

  constructor(private route:ActivatedRoute, private blogPostService:BlogPostService){
        
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      if(this.id){
        this.blogPostService.getBlogPostById(this.id).subscribe({
          next:(response) => {
            this.model = response; 
            console.log(this.model);
          }
        });
      }
    });
  }

  onSubmit(): void {
    console.log(this.model);
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
