import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../models/User';
import { Destination } from '../models/Package';
import { Booking } from '../models/Book';
import { PackagesService } from '../service/package.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sessionUser: BehaviorSubject<Users> = new BehaviorSubject<Users>(new Users());
  allPackages: BehaviorSubject<Destination[]> = new BehaviorSubject<Destination[]>([]);
  allBookings: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([]);
  user: Users = new Users();
  constructor(private http: HttpClient, private packageService: PackagesService) {
    this.loadSessionUser();
  }


  loadSessionUser() {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      this.user = new Users();
      this.user.userId = Number(storedUserId);
      this.sessionUser.next(this.user);
    } else {
      this.user = new Users();
      this.user.userName = '';
      this.sessionUser.next(this.user);
    }
  }
  clearSessionUser() {
    sessionStorage.clear();
    this.user = new Users();
    this.user.userName = '';
    this.sessionUser.next(this.user);

  }
  nextUser(data: Users) {
    this.user = data;
    this.sessionUser.next(this.user);
  }

  loadPackages() {
    this.packageService.getPackages().subscribe((data: Destination[]) => this.allPackages.next(data));
  }
}
