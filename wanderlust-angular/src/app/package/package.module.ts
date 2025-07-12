import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { PackagesComponent } from '../packages/packages.component';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PackagePricePipe } from '../packages/packages.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PackagesComponent,
    PackagePricePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    DialogModule,
    ProgressSpinnerModule,
    FormsModule,
    RouterModule
  ]
})
export class PackageModule { }
