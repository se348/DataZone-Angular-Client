import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowToast,CloseToast } from '../store/toast.actions';


@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private store: Store) {}

  showrToast(message: string) {
    this.store.dispatch(new ShowToast(message));
  }
  closehToast() {
    this.store.dispatch(new CloseToast());
  }
}
