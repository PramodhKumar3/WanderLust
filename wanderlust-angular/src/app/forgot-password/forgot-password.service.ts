import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }
  validateContactNumber(data: any): Observable<any> {
    return this.http.put(environment.forgotPassword, data);
  }
  resetPassword(data: any): Observable<any> {
    return this.http.put(environment.forgotPassword, data);
  }
}
