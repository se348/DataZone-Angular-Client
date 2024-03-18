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

    formData.append('Name', request.name!);
    formData.append('Description', request.description!);
    formData.append('Tags', JSON.stringify(request.tags));
    formData.append('DatasetFile', request.file!);
    formData.append('IsPrivate', request.isPrivate!.toString());
    
    console.log(formData);

    if (request.isPrivate) {
      // If isPrivate is true, append empty values for optional fields
      formData.append('IsDownloadable', '');
      formData.append('Price', '');
      formData.append('TermsAndConditions', '');
      formData.append('License', '');
    } else {
      // If isPrivate is false, append values for optional fields
      formData.append('IsDownloadable', request.isDownloadable ? 'true' : 'false');
      formData.append('Price', request.price ? request.price.toString() : '');
      formData.append('TermsAndConditions', request.terms || '');
      formData.append('License', request.license || '');
    }
    
    return this.http.post<any>(UPLOAD_DATASET_URL, formData);
  }


  getDatasetList(): Observable<PaginatedList<DatasetListModel>>{
    return this.http.get<PaginatedList<DatasetListModel>>(DATSET_LIST_URL);
  }
  
}
