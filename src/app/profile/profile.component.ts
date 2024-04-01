import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ImageService } from '../image.service';
import { UserService } from '../user.service';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  Url = 'https://img.icons8.com/ios/100/000000/contract-job.png';

  user: any;
  currentTime: Date = new Date();

  constructor(private userService: UserService,public dialog: MatDialog) {}

  ngOnInit(): void {
    // Fetch user data from the service
    this.user = this.userService.getUser();
  }
  openRegistrationFormDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px', // Adjust the width as needed
      // Add any other dialog configuration properties here
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed if needed
    });
  }
}
