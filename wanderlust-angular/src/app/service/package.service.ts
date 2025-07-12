import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Destination } from '../models/Package';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  

  constructor(private http: HttpClient) { }
  getPackages(): Observable<Destination[]>{
    return this.http.get<Destination[]>(environment.getPackages);
  }

  getDestinationById(): Observable<Destination[]>{
    return this.http.get<Destination[]>(environment.getDestinationById);
  }

}

