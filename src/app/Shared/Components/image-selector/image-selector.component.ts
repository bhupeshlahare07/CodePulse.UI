import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { BlogImage } from '../../models/blog-image.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  fileName: string = "";
  title: string = "";
  images$?: Observable<BlogImage[]>;

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
          console.log('Image uploaded successfully:', response);
        }
      });

    }
  }

  getImages(): void {
    this.images$ = this.imageService.GetAllImages();
  }

}