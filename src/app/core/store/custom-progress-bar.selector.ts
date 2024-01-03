import { createPropertySelectors } from '@ngxs/store';
import { ProgressStatusState, ProgressStatusStateModel } from './custom-progress-bar.state';


export class ProgressStatusSelector {
  static slices =
    createPropertySelectors<ProgressStatusStateModel>(ProgressStatusState);
}
