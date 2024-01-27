// toast.state.ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {
  CloseToast,
  ShowErrorToast,
  ShowSuccessToast,
  ShowToast,
} from './toast.actions';

export interface ToastStateModel {
  toast: { type: string | undefined; message: string | undefined };
}

@State<ToastStateModel>({
  name: 'toast',
  defaults: {
    toast: { type: undefined, message: undefined },
  },
})
@Injectable()
export class ToastState {
  @Action(ShowToast)
  showToast(ctx: StateContext<ToastStateModel>, { payload }: ShowToast) {
    ctx.setState({
      toast: { type: 'loading', message: payload },
    });
  }

  @Action(ShowSuccessToast)
  showSuccessToast(ctx: StateContext<ToastStateModel>, { payload }: ShowToast) {
    ctx.setState({
      toast: { type: 'success', message: payload },
    });
  }

  @Action(ShowErrorToast)
  showErrorToast(ctx: StateContext<ToastStateModel>, { payload }: ShowToast) {
    ctx.setState({
      toast: { type: 'error', message: payload },
    });
  }

  @Action(CloseToast)
  closeToast(ctx: StateContext<ToastStateModel>) {
    ctx.setState({
      toast: { type: undefined, message: undefined },
    });
  }
}
