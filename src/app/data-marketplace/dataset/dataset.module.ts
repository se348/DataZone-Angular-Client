import { NgModule } from '@angular/core';
import { DatasetUploadFormComponent } from './components/dataset-upload-form/dataset-upload-form.component';
import { DatasetRoutingModule } from './dataset-routing.module';
import { DragDropDatasetComponent } from './components/drag-drop-dataset/drag-drop-dataset.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    declarations: [DatasetUploadFormComponent, DragDropDatasetComponent],
    imports: [
        DatasetRoutingModule,
        CommonModule,
        SharedModule,
        
    ]
})
export class DatasetModule { }
