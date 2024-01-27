import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DATASET_UPLOAD_FORM_ROUTE } from 'src/app/core/constants/routes';
import { DatasetUploadFormComponent } from './components/dataset-upload-form/dataset-upload-form.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: DATASET_UPLOAD_FORM_ROUTE, 
                component: DatasetUploadFormComponent
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatasetRoutingModule {}
