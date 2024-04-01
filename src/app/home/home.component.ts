import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  openRegistrationFormDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
