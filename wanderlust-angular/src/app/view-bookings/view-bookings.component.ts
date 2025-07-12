import { Component, OnInit } from '@angular/core';
import { ViewbookingsService } from '../service/viewbookings.service';
import { Booking } from '../models/Book';
import { MessageService } from 'primeng/api';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css'],
  providers: [MessageService]
})
export class ViewBookingsComponent implements OnInit {
  
  data: Booking[] = [];
  cancelConfirmation: boolean = false;
  cancellationDetails: Booking = new Booking();
  errorMessage: string | null = null;
  loading = true;

  constructor(
    private viewBooking: ViewbookingsService,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    
    this.viewBooking.getMyBookings().subscribe(
      (response: any) => {
        console.log(response);
        this.data = response;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading bookings:', error);
        this.loading = false;
      }
    );
  }

  confirmCancellation(booking: any) {
    this.cancelConfirmation = true;
    this.cancellationDetails = booking;
  }

  cancelBooking(bookingId: any) {
    const userId = this.authService.user.userId;
    
    if (!userId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please log in to cancel bookings'
      });
      return;
    }
    
    this.viewBooking.cancelBooking(userId, bookingId)
      .subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Booking Cancelled',
            detail: "Your booking has been successfully " + response,
            life: 5000
          });
          
          this.errorMessage = null;
          this.cancelConfirmation = false;
          this.loadBookings();
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error ? JSON.parse(error.error).message : 'An error occurred',
            life: 5000
          });
        }
      );
  }
}
