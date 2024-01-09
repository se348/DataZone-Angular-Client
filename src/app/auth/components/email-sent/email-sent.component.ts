import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthFacade } from '../../facades/auth.facades';

@Component({
  selector: 'app-email-sent',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './email-sent.component.html',
  styleUrl: './email-sent.component.scss'
})
export class EmailSentComponent  {
  email: string | null = null;

  constructor(private route: ActivatedRoute, private readonly authFacade: AuthFacade) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      // Check if the 'email' parameter exists
      if (!this.email) {
        
      }
    });
  }

  resendConfirmationEmail(){
    this.authFacade.dispatchResendConfirmationEmail({email: this.email!})
  }
}
