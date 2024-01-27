import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-indicator',
  standalone: true,
  imports: [],
  templateUrl: './error-indicator.component.html',
  styleUrl: './error-indicator.component.scss'
})
export class ErrorIndicatorComponent {
  @Input() message: string | undefined;
  constructor(private router: Router) {}

  goBack() {
    this.router.navigateByUrl('/forget-password');
 }
}
