import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  userName: string = "";
  loggedIn: boolean = false;
  isNavBarCollapsed: boolean = false;
  isScrolled: boolean = false;

  constructor(public auth: AuthService, private router: Router) { }


  @HostListener('window:scroll')
  checkScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  ngOnInit() {
    this.checkScroll();
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      this.userName = storedUserName;
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }


    this.auth.sessionUser.subscribe((data: { userName: string; }) => {
      if (data && data.userName) {
        this.userName = data.userName;
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  toggleNavbar() {
    this.isNavBarCollapsed = !this.isNavBarCollapsed;
  }

  closeNavbar() {
    this.isNavBarCollapsed = false;
  }

  logoutAndClose() {
    this.logout();
    this.closeNavbar();
  }


  logout() {
    this.loggedIn = false;
    sessionStorage.removeItem("userId")
    sessionStorage.removeItem("userName")
    this.router.navigate(['/login'])
    sessionStorage.clear();
  }

  ngOnDestroy() {
    this.loggedIn = false;
  }
}