import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FootComponent } from './foot/foot.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { PackagePricePipe } from './packages/packages.pipe';
import { MessageService, PrimeNGConfig } from 'primeng/api'; 
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginService } from './service/login.service';
import { LoginGuard } from './login/login.guard';
import { AuthService } from './core/auth.service';
import { PackagesService } from './service/package.service';
import { BookService } from './service/book.service';
import { RegisterService } from './service/register.service';
import { ForgotPasswordService } from './forgot-password/forgot-password.service';
import { LoginComponent } from './login/login.component';
import { PackagesComponent } from './packages/packages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookModule } from 'src/book/book.module';
import { PackageModule } from './package/package.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    FootComponent,
    ForgotPasswordComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    
    
    RegisterComponent,
    ViewBookingsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogModule,
    SidebarModule,
    TabViewModule,
    InputSwitchModule,
    FieldsetModule,
    ToastModule,
    ProgressSpinnerModule,
    BookModule,
    PackageModule
   

  ],
  providers: [LoginService,
    LoginGuard, 
    AuthService,
    MessageService,
    PackagesService,
    BookService,
    RegisterService,
    PackagePricePipe,
    ForgotPasswordService 
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { 
  constructor(private primengConfig:PrimeNGConfig){
    this.primengConfig.ripple=true;
  }
}
