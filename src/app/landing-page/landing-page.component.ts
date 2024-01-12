import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { COMPLETE_PROFILE_PAGE_ROUTE } from '../core/constants/routes';

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
    if (this.selectedType === type ){
      this.selectedType = "";
    }
    else {
      this.selectedType = type;
    }
  }

  navToCompleteProfile(){

    if (this.selectedType === "company") {
      this.router.navigate([COMPLETE_PROFILE_PAGE_ROUTE]);
    }
    else if (this.selectedType === "user") {
      
    }

  }
}