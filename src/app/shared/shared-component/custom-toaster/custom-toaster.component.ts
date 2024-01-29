// toaster.component.ts
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationStart, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, filter } from 'rxjs';
import { ToastState, ToastStateModel } from 'src/app/core/store/toast.state';

@Component({
  selector: 'app-toaster',
  templateUrl: './custom-toaster.component.html',
  styleUrls: ['./custom-toaster.component.scss'],
})
export class CustomToasterComponent implements OnInit {
  @Select(ToastState) toastState$!: Observable<ToastStateModel>;

  toast: string | undefined = '';
  toastType: string | undefined = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.toastState$.subscribe((state) => {
      if (state.toast) {
        this.toast = state.toast.message;
        this.toastType = state.toast.type;
        this.showToastMessage();
      } else this.closeToast();
    });
  }

  showToast = false;

  showToastMessage() {
    this.showToast = true;
  }
  closeToast() {
    this.showToast = false;
  }
}
