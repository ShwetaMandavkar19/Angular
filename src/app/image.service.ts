import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imageData!: string | ArrayBuffer;

  setImageData(data: string | ArrayBuffer) {
    this.imageData = data;
  }

  getImageData(): string | ArrayBuffer {
    return this.imageData;
  }
}
