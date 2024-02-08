import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatasetListModel, DatasetUploadRequest } from '../models/dataset.model';
import { PaginatedList } from 'src/app/core/models/paginated_list';
import { DATSET_LIST_URL, UPLOAD_DATASET_URL } from 'src/app/core/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  constructor(private http: HttpClient) {}

  uploadDataset(request: Partial<DatasetUploadRequest>): Observable<any> {
    const formData = new FormData();

    formData.append('name', request.name!);
    formData.append('description', request.description!);
    formData.append('tags', JSON.stringify(request.tags));
    formData.append('file', request.file!);
    formData.append('isPrivate', request.isPrivate!.toString());
  
    if (request.isPrivate) {
      // If isPrivate is true, append empty values for optional fields
      formData.append('isDownloadable', '');
      formData.append('price', '');
      formData.append('terms', '');
      formData.append('license', '');
    } else {
      // If isPrivate is false, append values for optional fields
      formData.append('isDownloadable', request.isDownloadable ? 'true' : 'false');
      formData.append('price', request.price ? request.price.toString() : '');
      formData.append('terms', request.terms || '');
      formData.append('license', request.license || '');
    }
    console.log(request);
    return this.http.post<any>(UPLOAD_DATASET_URL, formData);
  }


  getDatasetList(): Observable<PaginatedList<DatasetListModel>>{
    return this.http.get<PaginatedList<DatasetListModel>>(DATSET_LIST_URL);
  }
  
}
