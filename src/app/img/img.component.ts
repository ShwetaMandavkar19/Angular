import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css'],
})
export class ImgComponent {
  imageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private imageService: ImageService
  ) {
    this.imageForm = this.fb.group({
      image: [''],
    });
  }
  Url = 'https://img.icons8.com/ios/100/000000/contract-job.png';

  onFileChange(event: any) {
    const file = event.target.files[0];
    const fileType = file.type;

    if (fileType.match(/image\/*/)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const width = img.width;
          const height = img.height;

          if (width === 310 && height === 325) {
            // Set the URL for preview
            this.Url = e.target.result;

            // Do not set the value of the file input directly
          } else {
            window.alert('Please select an image with dimensions 310x325 px.');
          }
        };
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

  // submitForm() {
  //   this.http
  //     .post('http://localhost:3000/image', this.imageForm.value)
  //     .subscribe(
  //       (response: any) => {
  //         console.log('Image uploaded successfully:', response);
  //         const imageUrl = response.imageUrl;
  //         // Navigate to user profile page with image URL
  //         this.router.navigate(['profile'], {
  //           queryParams: { imageUrl: imageUrl },
  //         });
  //       },
  //       (error) => {
  //         console.error('Error uploading image:', error);
  //       }
  //     );
  // }
  submitForm() {
    this.http.post('http://localhost:3000/image', this.imageForm.value)
      .subscribe(
        (response: any) => {
          console.log('Image uploaded successfully:', response);
          const imageUrl = response.imageUrl;
          // Set the image data in the service
          this.imageService.setImageData(imageUrl);
          // Navigate to user profile page
          this.router.navigate(['profile']);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
  }
  
}
