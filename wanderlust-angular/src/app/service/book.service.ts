import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/auth.service';
import { FormGroup } from '@angular/forms';
import { Users } from '../models/User';
import { Booking } from '../models/Book';
import { Destination } from '../models/Package';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  userId!: number;
  errorMessage: String = "";
  url = environment.book;
  getDestinationById = environment.getDestinationById;
  deleteUrl = environment.deleteUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  book(data: FormGroup, dealId: string, bookingData: { 
    noofPeople: any; 
    checkIn: string;
    checkout: string; 
    bookingTime: string; 
    totalCost: number; 
  }): Observable<String> {
  
    this.auth.sessionUser.subscribe((userData) => {
      this.userId = userData.userId;
    });
  
    var bookings: Booking = new Booking();
    bookings.checkIn = data.value.checkIn;
    bookings.checkOut = bookingData.checkout;
    bookings.noOfPeople = parseInt(data.value.noofPeople, 10);
    bookings.totalCost = bookingData.totalCost;
    bookings.timeStamp = bookingData.bookingTime;
    bookings.flight = data.value.flight;
    
    this.auth.sessionUser.subscribe((userData) => {
      bookings.user = userData;
    });
  
    var dest: Destination = new Destination();
    dest.destinationId = sessionStorage.getItem("destId");
    bookings.destination = dest;
    return this.http.post<string>(
      `${this.url}/${this.userId}/${bookings.destination.destinationId}`,
      bookings,
      { responseType: 'text' as 'json' }
    );
  }

  confirm(destinationId: string): Observable<any> {
    return <Observable<any>>this.http.get(this.getDestinationById + "/" + destinationId);
  }

}
