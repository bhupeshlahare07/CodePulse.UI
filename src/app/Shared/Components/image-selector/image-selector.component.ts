import { Component } from '@angular/core';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent {
  private file?: File;
  fileName?: string = "";
  title?: string = "";

onFileUploadChange(event:Event): void {
  const element = event.currentTarget as HTMLInputElement;
  this.file = element.files?.[0];
}

}
