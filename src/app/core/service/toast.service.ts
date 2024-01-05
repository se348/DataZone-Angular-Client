// toaster.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CloseToast, ShowToast } from '../store/toast.actions';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private store: Store) {}

  showToast(message: string) {
    this.store.dispatch(new ShowToast(message));
  }
  closeToast() {
    this.store.dispatch(new CloseToast());
  }
}
