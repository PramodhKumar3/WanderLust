import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from '../models/Package';
import { BookService } from '../service/book.service';
import { DatePipe } from '@angular/common';
import { ViewbookingsService } from '../service/viewbookings.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [DatePipe]
})
export class BookComponent implements OnInit {
  bookForm!: FormGroup;
  destination!: Destination;
  dealId!: string;
  totalCharges: number = 0;
  checkOutDate!: string;
  successMessage = false;
  bookingPresent = false;
  inclusions: string[] = [];
  highlights: string[] = [];
  today = new Date().toISOString().split('T')[0];


  costPerPerson: number = 0;
  flightCharge: number = 0;
  discount: number = 0;
  nights: number = 0;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private getBookings: ViewbookingsService
  ) { }

  ngOnInit(): void {
    this.dealId = this.route.snapshot.paramMap.get('dealId')!;

    if (!this.dealId) {
      this.router.navigate(['/packages']);
      return;
    }

    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    sessionStorage.setItem('destId', this.dealId);

    this.bookForm = this.fb.group({
      noofPeople: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
        Validators.pattern('^[1-5]$')
      ]],
      checkIn: ['', [
        Validators.required,
        this.dateValidator
      ]],
      flight: [false]
    });
    this.loadDestinationDetails();
  }

  dateValidator(control: any) {
    const inputDate = new Date(control.value);
    const currentDate = new Date();


    inputDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (inputDate < currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  loadDestinationDetails() {
    this.bookService.confirm(this.dealId).subscribe({
      next: (res) => {
        this.destination = res;
        this.costPerPerson = res.chargePerPerson || 0;
        this.flightCharge = res.flightCharge || 0;
        this.discount = res.discount || 0;
        this.nights = res.noOfNights || 0;
        if (res.details?.packageInclusion) {
          this.inclusions = res.details.packageInclusion
            .split(",")
            .map((item: string) => item.trim())
            .filter((item: string) => item);
        }

        if (res.details?.itinerary?.restOfDays) {
          this.highlights = res.details.itinerary.restOfDays
            .split(",")
            .map((item: string) => item.trim())
            .filter((item: string) => item);
        }
      },
      error: (err) => {
        alert("Unable to load destination details. Please try again later.");
        this.router.navigate(['/packages']);
      }
    });
  }

  getCostAndCheckOutDate() {
    this.calculateCostAndCheckout();
  }

  calculateCostAndCheckout() {
    if (this.bookForm.value.checkIn) {
      this.bookingPresent = false;
    }
    if (this.bookForm.value.noofPeople && this.bookForm.value.checkIn) {
      try {
        const numberOfPeople = parseInt(this.bookForm.value.noofPeople, 10);
        let totalCost = this.costPerPerson * numberOfPeople;

        if (this.bookForm.value.flight) {
          totalCost += this.flightCharge;
        }

        if (this.discount > 0) {
          totalCost = Math.max(0, totalCost - this.discount);
        }

        this.totalCharges = totalCost;

        const checkInDate = new Date(this.bookForm.value.checkIn);
        if (!isNaN(checkInDate.getTime())) {
          const checkOutDate = new Date(checkInDate);
          const nightsToAdd = this.nights > 0 ? this.nights : 1;
          checkOutDate.setDate(checkInDate.getDate() + nightsToAdd);
          this.checkOutDate = checkOutDate.toISOString();
        }
      } catch (error) {
        console.error("Calculation error:", error);
      }
    }
  }

  bookDestination() {
    if (this.bookForm.valid) {
      if (!this.destination || !this.dealId) {
        alert("Missing destination information. Please try again.");
        return;
      }
      const selectedCheckIn = this.bookForm.value.checkIn;
      this.getBookings.getMyBookings().subscribe({

        next: (bookings) => {
          const isAlreadyBooked = bookings.some(booking => {
            const existingCheckIn = booking.checkIn ? booking.checkIn.split('T')[0] : '';
            return existingCheckIn === selectedCheckIn;
          });

          if (isAlreadyBooked) {
            this.bookingPresent = true;
            document.getElementById('checkIn')?.scrollIntoView({ behavior: 'smooth' });
            return;
          }
          this.proceedToBooking();

        },

        error: (error) => {
          console.error('Error fetching existing bookings:', error);
          if (error.status === 404 || error.status === 400|| error.status === 500 || error.status === 0) {
            this.proceedToBooking();
          } else {
            alert('Failed to fetch existing bookings. Please try again later.');
          }
        }

      });

    } else {
      this.markFormGroupTouched(this.bookForm);
    }
  }

  private proceedToBooking() {
    try {
      const checkInDate = new Date(this.bookForm.value.checkIn);
      const nightsToAdd = this.nights > 0 ? this.nights : 1;
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkInDate.getDate() + nightsToAdd);

      const now = new Date();
      const formattedDate = this.datePipe.transform(now, 'medium') || now.toISOString();

      const bookingData = {
        noofPeople: parseInt(this.bookForm.value.noofPeople, 10),
        checkIn: this.bookForm.value.checkIn,
        checkout: checkOutDate.toISOString(),
        bookingTime: formattedDate,
        totalCost: this.totalCharges
      };

      this.bookService.book(this.bookForm, this.dealId, bookingData).subscribe({
        next: (response) => {
          this.successMessage = true;
          this.bookingPresent = false;
        },
        error: (error) => {
          if (error.status === 409) {
            this.bookingPresent = true;
            document.getElementById('checkIn')?.scrollIntoView({ behavior: 'smooth' });
          } else {
            alert('Booking failed. Please try again later.');
          }
        }
      });

    } catch (error) {
      console.error('Caught Error', error);
      alert('An unexpected error occurred. Please try again.');
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
        control.markAsDirty();
      }
    });
  }

  closeModal() {
    this.successMessage = false;
    this.router.navigate(['/viewBookings']);
  }

  resetBookingPresent() {
    this.bookingPresent = false;
  }

  handleDateChange() {
    if (this.bookForm && this.bookForm.value && this.bookForm.value.checkIn) {
      this.getCostAndCheckOutDate();
      this.resetBookingPresent();
    }
  }
}