import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) { 
    this.jwtHelper = new JwtHelperService();
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getRememberMeState() {
    return localStorage.getItem('rememberMeState');
  }

  refreshToken() {
    return this.http.post<any>(environment.api + 'auth/refresh', {})
      .pipe(map(user => {
        if (user && user.access_token) {
          localStorage.setItem('token', user.access_token);
        }

        return user;
      }));
  }

  logIn(user: object) {
    return this.http.post<any>(environment.api + 'auth/login', user)
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

  register(user: object) {  
    return this.http.post<any>(environment.api + 'auth/register', user)
      .pipe(map(user => {
        // Register successful if there's a jwt token in the response
        if (user && user.access_token) {
          // Store the userId and the token in localStorage;
          localStorage.setItem('userId', user.user_id);
          localStorage.setItem('token', user.access_token);
        }

        return user;
      }));
  }

  updateUser(user: User) {
    return this.http.put<any>(environment.api + 'users/' + user.id, user)
      .pipe(map(user => {
        return new User(user.data);
      }));
  }

  deleteUserAccount(user: User) {
    return this.http.delete<any>(environment.api + 'users/' + user.id);
  }

  getConnectedUser() {
    return this.http.get<any>(environment.api + 'auth/me')
      .pipe(map(user => {
        return new User(user.data);
      }));
  }

  alreadyConnected() {
    // Return true if user is connected, false otherwise
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }
}
