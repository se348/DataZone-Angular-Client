import { DatasetUploadRequest } from "../models/dataset.model";


export class DatasetUpload {
  static readonly type = `[DataMarketplace] ${DatasetUpload.name}`;
  constructor(public request: Partial<DatasetUploadRequest>) {}
}

export class GetDatasetList {
  static readonly type = `[DataMarketplace] ${GetDatasetList.name}`;
  constructor() {}
}
