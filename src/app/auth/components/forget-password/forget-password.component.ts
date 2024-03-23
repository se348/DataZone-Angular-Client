import { ResetPassword } from './../../store/auth.actions';
import { AuthFacade } from './../../facades/auth.facades';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  email!: string | null;
  emailForm!: FormGroup;

  constructor(
    private authFacade: AuthFacade,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: [''],
    });
  }

  onSubmit(): void {
    const { valid, touched, dirty } = this.emailForm;
    if (valid && (touched || dirty)) {
      this.authFacade.dispatchForgetPassword({
        email: this.emailForm.value.email,
      });
    }
  }
}
