// toaster.component.ts
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ToastState, ToastStateModel } from 'src/app/core/store/toast.state';

@Component({
  selector: 'app-toaster',
  templateUrl: './custom-toaster.component.html',
  styleUrls: ['./custom-toaster.component.scss'],
})
export class CustomToasterComponent implements OnInit {
  @Select(ToastState) toastState$!: Observable<ToastStateModel>;

  toast: string = '';

  ngOnInit() {
    this.toastState$.subscribe((state) => {
      if (state.toast) {
        this.toast = state.toast;
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
