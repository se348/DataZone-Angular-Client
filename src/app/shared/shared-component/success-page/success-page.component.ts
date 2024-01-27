import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateMessageService } from 'src/app/core/service/state-message.service';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.scss',
})
export class SuccessPageComponent {
  message: string | undefined;
  constructor(
    private router: Router,
    private stateMessageService: StateMessageService
  ) {}

  ngOnInit() {
    this.stateMessageService.getStateMessage().subscribe((message) => {
      this.message = message!;
    });
  }

  goBack() {
    this.router.navigateByUrl('/forget-password');
  }
}
