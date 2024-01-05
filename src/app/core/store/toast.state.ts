// toast.state.ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { CloseToast, ShowToast } from './toast.actions';

export interface ToastStateModel {
  toast: string | undefined;
}

@State<ToastStateModel>({
  name: 'toast',
  defaults: {
    toast: undefined,
  },
})
@Injectable()
export class ToastState {
  @Action(ShowToast)
  showToast(ctx: StateContext<ToastStateModel>, { payload }: ShowToast) {
    ctx.setState({
      toast: payload,
    });
  }
  @Action(CloseToast)
  closeToast(ctx: StateContext<ToastStateModel>) {
    ctx.setState({
      toast: undefined,
    });
  }
}
