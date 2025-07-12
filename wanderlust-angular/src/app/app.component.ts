import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'WanderLust';
  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit() {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      this.auth.loadSessionUser();
    }
    else {
      this.auth.clearSessionUser();
      this.router.navigate(['/home']);
    }
  }
}
