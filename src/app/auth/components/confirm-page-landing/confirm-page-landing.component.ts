import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LANDING_PAGE_ROUTE, LOGIN_ROUTE } from 'src/app/core/constants/routes';
import { AuthFacade } from '../../facades/auth.facades';

@Component({
  selector: 'app-confirm-page-landing',
  templateUrl: './confirm-page-landing.component.html',
  styleUrl: './confirm-page-landing.component.scss'
})
export class ConfirmPageLandingComponent {


  userId : string| undefined  = undefined;
  token: string | undefined = undefined;
  constructor(private activeRoute: ActivatedRoute, private router: Router, private authFacade: AuthFacade){
    this.activeRoute.queryParams.subscribe((p)=>{
      this.userId = p['userId'];
      this.token = p['code'];
    })
    console.log(this.userId, this.token)
    if(this.userId && this.token){
     this.authFacade.dispatchConfirmEmail(this.userId, this.token);
     this.router.navigate([LANDING_PAGE_ROUTE]);

    }
    else this.router.navigate([LOGIN_ROUTE]);
  }

}
