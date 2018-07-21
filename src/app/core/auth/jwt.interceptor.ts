import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { first, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    jwtHelper: JwtHelperService;

    constructor(private auth: AuthService, private router: Router) {
        this.jwtHelper = new JwtHelperService();
    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add authorization header with jwt token if available
        let token = this.auth.getToken();

        if (token && !this.jwtHelper.isTokenExpired(token)) {

            // Refresh token if it will expired and if user want remember him
            let expiredDate = this.jwtHelper.getTokenExpirationDate(token);
            let rememberMeState = this.auth.getRememberMeState();
            let currentDate = new Date();
            let hoursDiff = Math.abs(currentDate.getTime() - expiredDate.getTime()) / (60 * 60 * 1000);
            let refreshTokenUrl = environment.api + 'auth/refresh';

            if (rememberMeState && hoursDiff <= 1 && request.url != refreshTokenUrl) {
                this.auth.refreshToken()
                .pipe(first())
                .subscribe(
                    data => {
                    },
                    error => {
                        // If the token is already expired, we navigate to login page
                        this.router.navigate(['/login']);
                    });
            }

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request).pipe(
            tap(event => {
            }, error => {
                // If there is error, we navigate to login page
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401 || error.status === 500) {
                        this.auth.logout();
                        this.router.navigate(['/login']);
                    }
                }
            })
        );
    }
}