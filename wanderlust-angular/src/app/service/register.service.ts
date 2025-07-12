import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  register(data:any): Observable<string>{
    return<Observable<string>> this.http.post(environment.registerUser,data,{responseType:"text"});
  }
}
