import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { LoginRequest, RegisterRequest, ResendConfirmationRequest } from "../models/auth.model";

import { Login, CompleteCompanyProfile, ConfirmEmail, Register, ResendConfirmEmail } from "../store/auth.actions";
import { AuthSelector } from "../store/auth.selector";

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  isAuthenticated$: Observable<boolean> = this.store.select(
    AuthSelector.isAuthenticated
  );

  @Select(AuthSelector.accessToken)
  accessToken$!: Observable<string>;

  constructor(private store: Store) {}

  dispatchLogin(request: LoginRequest) {
    this.store.dispatch(new Login(request));
  }

  dispatchCompleteCompanyProfile(request: FormData) {
    this.store.dispatch(new CompleteCompanyProfile(request));
  }

  dispatchConfirmEmail(userId: string, token: string) {
    this.store.dispatch(new ConfirmEmail(userId, token));
  }
  dispatchRegister(request: RegisterRequest) {
    this.store.dispatch(new Register(request));
  }

  dispatchResendConfirmationEmail(request: ResendConfirmationRequest){
    this.store.dispatch(new ResendConfirmEmail(request))
  }
}
