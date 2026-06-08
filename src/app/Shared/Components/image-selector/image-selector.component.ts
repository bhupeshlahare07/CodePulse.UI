import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImageService } from './image.service';
import { BlogImage } from '../../models/blog-image.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  fileName: string = "";
  title: string = "";
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;
  
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
  uploadImage(): void {
    if (this.file && this.fileName != "" && this.title != "") {
      this.imageService.uploadImage(this.file, this.fileName, this.title).subscribe({
        next: (response) => {
          this.getImages();
          this.imageUploadForm?.resetForm();
          console.log('Image uploaded successfully:', response);
        }
      });

    }
  }

  getImages(): void {
    this.images$ = this.imageService.GetAllImages();
  }

}