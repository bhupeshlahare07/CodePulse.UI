import { Component } from '@angular/core';
import { AddBlogpost } from '../models/add-blogpost.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent {
  model:AddBlogpost;

  constructor(){
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      isvisible: false
    };
  }
  onSubmit(): void {
    console.log('Form submitted:', this.model);
    // Here you can add logic to send the form data to your backend service
  }

}
