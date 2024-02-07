import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {COMPLETE_COMPANY_PROFILE_PAGE_ROUTE, COMPLETE_USER_PROFILE_PAGE_ROUTE} from '../core/constants/routes';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  selectedType: string = '';

  constructor(private router: Router){
  }

  onSelect(type: string) {
    console.log(type);
    if (this.selectedType === type ){
      this.selectedType = "";
    }
    else {
      this.selectedType = type;
    }
  }

  navToCompleteProfile(){

    if (this.selectedType === "company") {
      this.router.navigate([COMPLETE_COMPANY_PROFILE_PAGE_ROUTE]);
    }
    else if (this.selectedType === "user") {
      this.router.navigate([COMPLETE_USER_PROFILE_PAGE_ROUTE]);
    }

  }
}
