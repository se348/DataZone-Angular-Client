import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { DatasetUploadRequest } from '../models/dataset.model';
import { DatasetUpload, GetDatasetList } from '../store/dataset.action';

@Injectable({
  providedIn: 'root',
})
export class DatasetFacade {

  constructor(private store: Store) {}

  dispatchUploadDataset(request: Partial<DatasetUploadRequest>) {
    this.store.dispatch(new DatasetUpload(request));
  }

  dispatchGetDatasets(){
    this.store.dispatch(new GetDatasetList());
  }
}
