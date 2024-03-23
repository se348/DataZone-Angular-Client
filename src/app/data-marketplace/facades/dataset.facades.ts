import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  DatasetListModel,
  DatasetUploadRequest,
} from '../models/dataset.model';
import {
  DatasetUpload,
  GetDataset,
  GetDatasetList,
} from '../store/dataset.action';
import { DatasetSelector } from '../store/dataset.selector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasetFacade {
  dataSet$ = this.store.select(DatasetSelector.dataset);
  dataSetList$ = this.store.select(DatasetSelector.datasetList);

  @Select(DatasetSelector.dataset)
  dataset$!: Observable<DatasetListModel>;

  constructor(private store: Store) {}

  dispatchUploadDataset(request: Partial<DatasetUploadRequest>) {
    this.store.dispatch(new DatasetUpload(request));
  }

  dispatchGetDatasets() {
    this.store.dispatch(new GetDatasetList());
  }

  dispatchGetDataset(id: string) {
    this.store.dispatch(new GetDataset(id));
  }
}
