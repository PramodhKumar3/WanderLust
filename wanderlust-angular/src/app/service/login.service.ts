import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }
  login(data: any): Observable<Users> {
    return <Observable<Users>>this.http.post<Users>(environment.loginUri, data);
    
      
  }
  register(data:any): Observable<Users>{
    return<Observable<Users>>this.http.post<Users>(environment.registerUser,data);
  }

}
