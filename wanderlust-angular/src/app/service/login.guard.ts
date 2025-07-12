import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

import { Users } from '../models/User';


@Injectable()
export class LoginGuard implements CanActivate {
    user!:Users;
    constructor(private router: Router,private auth:AuthService ) {};
    canActivate():any {
        if(this.checkUser()) {
            return true;
        } 
        else {
            this.router.navigate(['/login']);
        }
    }

    checkUser():boolean {
        this.auth.sessionUser.subscribe((user: Users)=>this.user = user)
        if(this.user.userId != null) {
            return true;
        }
        else return false;
    }
}