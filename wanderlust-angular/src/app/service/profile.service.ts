// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { Users } from '../models/User';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfileService {
//   constructor(private http: HttpClient) { }
  
//   getUserById(userId: string): Observable<Users> {
//     return this.http.get<Users>(`${environment.getUserProfile}/${userId}`);
//   }

//   updateUserProfile(user: Users): Observable<any> {
//     return this.http.put(`${environment.updateUserProfile}/${user.userId}`, user);
//   }
  
//   changePassword(passwordData: {userId: string, currentPassword: string, newPassword: string}): Observable<any> {
//     return this.http.put(environment.changePassword, passwordData);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }
  
  getUserById(userId: string): Observable<Users> {
    return this.http.get<Users>(`${environment.getUserProfile}/${userId}`);
  }

  updateUserProfile(user: Users): Observable<any> {
    return this.http.put<any>(environment.updateUserProfile, user);
  }
  
  // changePassword(passwordData: {userId: string | null, currentPassword: string, newPassword: string}): Observable<any> {
  //   return this.http.post<any>(environment.changePassword, passwordData);
  // }
   // Modified method - ensure the request body matches what backend expects
  //  changePassword(passwordData: {userId: string | null, currentPassword: string, newPassword: string}): Observable<any> {
  //   // Convert userId to number if it's a string, as backend expects Integer
  //   const requestData = {
  //     userId: passwordData.userId ? parseInt(passwordData.userId) : null,
  //     currentPassword: passwordData.currentPassword,
  //     newPassword: passwordData.newPassword
  //   };
    
  //   return this.http.post<any>(environment.changePassword, requestData);
  // }
  changePassword(passwordData: {userId: string | null, currentPassword: string, newPassword: string}): Observable<string> {
    return this.http.post(environment.changePassword, passwordData, {
      responseType: 'text'  // This tells Angular to expect a text response, not JSON
    });
  }
}