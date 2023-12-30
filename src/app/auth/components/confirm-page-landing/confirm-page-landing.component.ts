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
    this.activeRoute.params.subscribe((p)=>{
      this.userId = p['UserId'];
      this.token = p['token'];
    })
    if(this.userId && this.token){
     this.authFacade.dispatchConfirmEmail(this.userId, this.token);}
    else this.router.navigate([LOGIN_ROUTE]);
    this.router.navigate([LANDING_PAGE_ROUTE]);
  }

}
