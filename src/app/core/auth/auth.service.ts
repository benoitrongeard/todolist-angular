import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logIn(email: string, password: string) {
    return this.http.post<any>(environment.api + 'auth/login', { email: email, password: password })
      .pipe(map(user => {
        // Login successful if there's a jwt token in the response
        if (user && user.access_token) {
          // Store the userId and the token in localStorage;
          localStorage.setItem('userId', user.user_id);
          localStorage.setItem('token', user.access_token);
        }

        return user;
      }));
  }
}
