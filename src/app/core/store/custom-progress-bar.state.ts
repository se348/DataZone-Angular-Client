import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { SetProgressOff, SetProgressOn } from './custom-progress-bar.actions';

export interface ProgressStatusStateModel {
  inprogress: boolean;
}

const PROGRESS_STATUS_STATE_TOKEN = new StateToken<ProgressStatusStateModel>(
  'progressStatusState',
);

const defaults = {
  inprogress: false,
};

@State<ProgressStatusStateModel>({
  name: PROGRESS_STATUS_STATE_TOKEN,
  defaults: defaults,
})
@Injectable()
export class ProgressStatusState {
  @Action(SetProgressOff)
  setProgressOff({ setState }: StateContext<ProgressStatusStateModel>) {
    setState({ inprogress: false });
  }

  @Action(SetProgressOn)
  setProgressOn({ setState }: StateContext<ProgressStatusStateModel>) {
    setState({ inprogress: true });
  }
}
