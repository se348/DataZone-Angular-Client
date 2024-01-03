import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SetProgressOff, SetProgressOn } from "../store/custom-progress-bar.actions";
import { ProgressStatusSelector } from "../store/custom-progress-bar.selector";


@Injectable({
  providedIn: 'root',
})
export class CustomProgressBarFacade {
  inprogress$: Observable<boolean> = this.store.select(
    ProgressStatusSelector.slices.inprogress,
  );

  constructor(private store: Store) {}

  dispatchSetProgessOff() {
    this.store.dispatch(new SetProgressOff());
  }

  dispatchSetProgessOn() {
    this.store.dispatch(new SetProgressOn());
  }
}
