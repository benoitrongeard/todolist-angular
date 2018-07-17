import { AuthService } from 'src/app/core/auth';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any> {

  constructor(private auth: AuthService) { }

  resolve() {
    return this.auth.getConnectedUser();
  }
}
