import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-indicator',
  standalone: true,
  imports: [],
  templateUrl: './success-indicator.component.html',
  styleUrl: './success-indicator.component.scss',
})
export class SuccessIndicatorComponent {
  @Input() message: string | undefined;
  constructor(private router: Router) {}
}
