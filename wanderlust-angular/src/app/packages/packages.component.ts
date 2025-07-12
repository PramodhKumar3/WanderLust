import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { PackagePricePipe } from './packages.pipe';
import { Destination } from '../models/Package';
import { PackagesService } from '../service/package.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit, OnDestroy {
  filteredList!: any[];
  newList: Destination[] = [];
  customerRating: number = 0;
  bookingPage: Boolean = false;
  chargePerPerson: any;
  maxPrice: number = 0;
  minPrice: number = 0;
  noOfDays: number = 0;
  showItenary: boolean = false;
  errorMessage: string = "";
  continent: any;
  highlights!: string[];
  inclusions: string[] = [];
  pace: string[] = [];
  isUserLoggedIn = false;
  private authSubscription: Subscription | null = null;

  selectedDestination: Destination = new Destination();
  allPackages: Destination[] = [];
  searchTerm: string = '';
  expandedDescriptions: { [key: string]: boolean } = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private packagesService: PackagesService,
    private authService: AuthService,
    private pipes: PackagePricePipe,
    private cdr: ChangeDetectorRef
  ) {
    this.continent = this.route.snapshot.paramMap.get('continent');
  }
  ngOnInit() {
   
    this.checkAuthStatus();

    this.router.events.subscribe(() => {
      this.checkAuthStatus();
      this.cdr.detectChanges(); 
    });

    this.authSubscription = this.authService.sessionUser.subscribe(user => {
      const wasLoggedIn = this.isUserLoggedIn;
      this.isUserLoggedIn = !!user && !!user.userId;

      if (wasLoggedIn !== this.isUserLoggedIn) {
        this.cdr.detectChanges();
      }
    });

    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.fetchPackges();
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  toggleDescription(destinationId: string, event: Event) {
    event.stopPropagation();
    this.expandedDescriptions[destinationId] = !this.expandedDescriptions[destinationId];
  
    if (this.expandedDescriptions[destinationId]) {
      setTimeout(() => {
        const card = event.target as HTMLElement;
        const cardElement = card.closest('.package-card');
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
    
  
    this.cdr.detectChanges();
  }

  checkAuthStatus() {
    const wasLoggedIn = this.isUserLoggedIn;
    this.isUserLoggedIn = !!sessionStorage.getItem('userId');

    if (wasLoggedIn !== this.isUserLoggedIn) {
      this.cdr.detectChanges();
    }
  }

  ngAfterViewChecked() {
    this.checkAuthStatus();
  }

  fetchPackges() {
    this.packagesService.getPackages().subscribe({
      next: (data: Destination[]) => {
        if (this.continent) {
          this.allPackages = data.filter(dest =>
            dest.continent.toLowerCase() === this.continent.toLowerCase()
          );
        } else {
          this.allPackages = data;
        }
        this.authService.allPackages = new BehaviorSubject<Destination[]>(this.allPackages);
        this.showValue();
      },
      error: () => {
        this.errorMessage = "Error fetching packages. Please try again later.";
      }
    });
  }

  getitenary(selectedDeal: string) {
    this.showItenary = true;
    this.selectedDestination = this.allPackages.find(dest => dest.destinationId === selectedDeal) || new Destination();

    if (this.selectedDestination.details) {
      this.highlights = this.selectedDestination.details.itinerary.restOfDays.split(",");
      this.inclusions = this.selectedDestination.details.packageInclusion.split(",");
      this.pace = this.selectedDestination.details.pace.split(",");
    }
  }


  loadBookingPage(destinationId: string) {
    this.checkAuthStatus();

    if (!this.isUserLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.showItenary = false;
    this.router.navigate(['book/' + destinationId]);
  }

  dropItenerary() {
    this.showItenary = false;
    this.selectedDestination = new Destination();
  }

  showValue() {
    this.newList = this.allPackages;

    if (this.searchTerm.trim() !== '') {
      const lowerSearch = this.searchTerm.toLowerCase();
      this.newList = this.newList.filter(data =>
        data.continent.toLowerCase().includes(lowerSearch) ||
        data.destinationName.toLowerCase().includes(lowerSearch)
      );
    }

    if (this.newList.length === 0) {
      this.errorMessage = "Sorry, we don't operate in this destination";
    } else {
      this.errorMessage = '';
    }

    if (this.minPrice > 0) {
      this.newList = this.newList.filter(data => data.chargePerPerson >= this.minPrice);
    }

    if (this.maxPrice > 0) {
      this.newList = this.newList.filter(data => data.chargePerPerson <= this.maxPrice);
    }

    if (this.noOfDays > 0) {
      this.newList = this.newList.filter(data => data.noOfNights <= this.noOfDays);
    }
    const selectedRating=Number(this.customerRating);
    if (selectedRating > 0) {
      switch (selectedRating) {
        case 3: this.minPrice = 2000; break;
        case 3.5: this.minPrice = 3000; break;
        case 4: this.minPrice = 4000; break;
        case 4.5: this.minPrice = 5000; break;
      }

      this.newList = this.newList.filter(data => data.chargePerPerson >= this.minPrice);
    }

    this.newList = this.pipes.transform(this.newList);
  }

  updateMinPrice(event: Event) {
    const target = event.target as HTMLInputElement;
    this.minPrice = Number(target.value);
    this.showValue();
  }

  updateMaxPrice(event: Event) {
    const target = event.target as HTMLInputElement;
    this.maxPrice = Number(target.value);
    this.showValue();
  }

  updateDays(event: Event) {
    const target = event.target as HTMLInputElement;
    this.noOfDays = Number(target.value);
    this.showValue();
  }
}