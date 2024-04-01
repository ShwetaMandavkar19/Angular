import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{MatDialog} from'@angular/material/dialog';
import { RegisterComponent } from './register/register.component';


@Injectable({
  providedIn: 'root'
})
export class RegistrationApiService {

  apiUrl = 'http://localhost:3000/register'; // Assuming your JSON server is running on localhost:3000

  constructor(private http: HttpClient,public dialog: MatDialog) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
  openRegistrationModal(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px', // Adjust width as needed
      // You can add more configuration options here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The registration modal was closed');
    });
  }
}
