import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { BookComponent } from 'src/app/book/book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';




@NgModule({
  declarations: [
    BookComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FieldsetModule,
    ReactiveFormsModule,
    FormsModule,
    // ProgressSpinnerModule

  ]
})
export class BookModule { }
