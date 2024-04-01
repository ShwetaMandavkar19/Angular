import { Component, OnInit } from '@angular/core';
import { RegistrationApiService } from '../registration-api.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { Validators } from '@angular/forms';

interface User {
  img: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number | null;
  country: string;
  state: string;
  addressType: string;
  homeAddress1: string;
  homeAddress2: string;
  companyAddress1: string;
  companyAddress2: string;
  hobbyInput: string[]; // Specify type as string array
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  imageUrl: string = '';
  selectedFile!: File;
  imageForm!: FormGroup;
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private registrationApiService: RegistrationApiService,
    private http: HttpClient,
    private router: Router,
    private imageService: ImageService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.imageForm = this.fb.group({
      image: [''],
    });

    this.userForm = this.fb.group({
      img: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(60)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      addressType: ['', Validators.required],
      homeAddress1: [''],
      homeAddress2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      hobbyInput: [[]], // Changed to an array of arrays
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

  selectable: boolean = true;
  removable: boolean = true;
  separatorKeysCodes: number[] = [13, 188]; // Example separator keys
  addOnBlur: boolean = true;

  ngOnInit(): void {}

  user: User = {
    img: '',
    firstName:'',
    lastName: '',
    email: '',
    phoneNumber: '',
    age: null,
    country: '',
    state: '',
    addressType: '',
    homeAddress1: '',
    homeAddress2: '',
    companyAddress1: '',
    companyAddress2: '',
    hobbyInput: [],
  };



  submitForm() {
    this.registrationApiService.registerUser(this.user).subscribe(
      (response) => {
        console.log('User registered successfully!', response);
        this.userService.setUser(this.user);
        this.router.navigate(['profile']);
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
    this.http
      .post('http://localhost:3000/image', this.imageForm.value)
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
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }
  uploadImage() {
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post('http://localhost:3000/register', formData).subscribe(
      (response) => {
        console.log('Image uploaded successfully', response);
      },
      (error) => {
        console.error('Error uploading image', error);
      }
    );
  }

  hobbyInput: string = '';
  hobbies: string[] = ['football', 'hockey']; // Initial fixed hobbies

  addHobby() {
    if (this.hobbyInput.trim()) {
      this.hobbies.push(this.hobbyInput.trim());
      this.hobbyInput = '';
    }
  }

  removeHobby(hobby: string) {
    const index = this.hobbies.indexOf(hobby);
    if (index !== -1) {
      this.hobbies.splice(index, 1);
    }
  }

  addHobbyChip() {
    if (this.hobbies.length < 5) {
      // Limit the number of hobbies to add
      this.hobbies.push('New Hobby');
    }
  }


  





}
