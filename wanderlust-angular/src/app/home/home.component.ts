import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchTerm: string = '';
  
  constructor(private router: Router) { }

  searchPackages() {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/packages'], { 
        queryParams: { search: this.searchTerm } 
      });
    } else {
      this.router.navigate(['/packages']);
    }
  }
  
  navigateToCategory(continent: string) {
    this.router.navigate(['/packages'], { 
      queryParams: { search: continent } 
    });
  }
}