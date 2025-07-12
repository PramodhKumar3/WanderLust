import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './book/book.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { LoginGuard } from './login/login.guard';
import { PackagesComponent } from './packages/packages.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'hotdeals', component:HomeComponent },
  { path: 'book/:dealId', component: BookComponent },
  { path: 'viewBookings', component: ViewBookingsComponent, canActivate: [LoginGuard] },
  { path: 'packages', component: PackagesComponent },
  { path: 'packages/:continent', component: PackagesComponent },
  {
    path: 'profile',
    component: ProfileComponent
  },
  { path: "**", redirectTo: "", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
