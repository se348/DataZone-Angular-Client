import { Router } from '@angular/router';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  DatasetUpload, GetDatasetList,
} from './dataset.action';
import { tap } from 'rxjs';
import { DatasetService } from '../services/dataset.service';
import { DatasetListModel, DatasetUploadRequest } from '../models/dataset.model';
import { PaginatedList } from 'src/app/core/models/paginated_list';

export interface DatasetStateModel {
  datasetList: PaginatedList<DatasetListModel> | null;
}

const DATASET_STATE_TOKEN = new StateToken<DatasetStateModel>(
  'DatasetState'
);
const defaultState: DatasetStateModel = {
  datasetList: null,
};

@State<DatasetStateModel>({
  name: DATASET_STATE_TOKEN,
  defaults: defaultState,
})
@Injectable()
export class DatasetState {
  constructor(
    private readonly datasetService: DatasetService,
    private store: Store,
    private readonly router: Router
  ) {}

  @Action(DatasetUpload)
  uploadDataset(
    { patchState }: StateContext<DatasetUploadRequest>,
    { request }: DatasetUpload
  ) {
    return this.datasetService.uploadDataset(request).pipe(
      tap((response: any) => {
        
      })
    );
  }

  @Action(GetDatasetList)
  getCompanyProfile(
    { patchState }: StateContext<any>,
  ) {
    return this.datasetService.getDatasetList().pipe(
      tap((response) => {
        patchState({
          datasetList: response,
        });
      })
    );
  }
}
