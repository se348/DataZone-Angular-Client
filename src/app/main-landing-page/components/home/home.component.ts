import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_ROUTE } from 'src/app/core/constants/routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  constructor(private readonly router: Router,) {}

  navigateToLogin() {
    this.router.navigate([LOGIN_ROUTE]);
  }
}
