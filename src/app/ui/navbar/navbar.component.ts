import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'td-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public activeMobileMenu: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  toggleMenu() {
    this.activeMobileMenu = !this.activeMobileMenu;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
