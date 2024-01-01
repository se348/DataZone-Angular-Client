import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { COMPLETE_PROFILE_PAGE_ROUTE } from '../core/constants/routes';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(private router: Router){
  }
  navToCompleteProfile(){
    this.router.navigate([COMPLETE_PROFILE_PAGE_ROUTE]);
  }
}
