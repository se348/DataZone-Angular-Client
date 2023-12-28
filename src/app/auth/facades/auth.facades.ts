import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSelector } from '../store/auth.selector';
import { LoginRequest, RegisterRequest } from '../models/auth.model';
import { Select, Store } from '@ngxs/store';
import { Login, Register } from '../store/auth.actions';

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

  dispatchRegister(request: RegisterRequest) {
    this.store.dispatch(new Register(request));
  }
}
