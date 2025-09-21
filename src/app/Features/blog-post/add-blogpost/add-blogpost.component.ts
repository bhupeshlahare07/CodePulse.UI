import { Component } from '@angular/core';
import { AddBlogpost } from '../models/add-blogpost.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent {
  model:AddBlogpost;

  constructor(private blogpostservise:BlogPostService, private router:Router){
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),
      isvisible: true
    };
  }
  onSubmit(): void {
    this.blogpostservise.createBlogPost(this.model)
    .subscribe({
      next:(response)=>{
      this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }

}
