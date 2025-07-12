import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { Booking } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class ViewbookingsService {

  deleteUrl =  environment.deleteUrl;
  constructor(private http: HttpClient, private auth:AuthService) { }

  getMyBookings():Observable<Booking[]>{
    const userId=this.auth.user.userId;
    return this.http.get<Booking[]>(environment.getBookings+userId)
  }

  cancelBooking(userId:number,bookingId:number):Observable<String>{
    return this.http.delete(this.deleteUrl+"/"+bookingId,{responseType:'text'})

  }
}
