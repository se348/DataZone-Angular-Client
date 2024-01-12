import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { CustomStepperComponent } from './custom-stepper/custom-stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CustomToasterComponent } from './custom-toaster/custom-toaster.component';
import { CustomSpinnerComponent } from './custom-progress-bar/spinner-dotted.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SharedModule } from '../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CustomStepperComponent, DragDropComponent, ProfilePictureComponent,CustomSpinnerComponent, CustomToasterComponent
  ],
  imports: [
    CommonModule, 
    CdkStepperModule, ReactiveFormsModule, MatIconModule
  ],
  exports:[CustomStepperComponent, CustomToasterComponent, DragDropComponent, ProfilePictureComponent]
})
export class SharedComponentModule { }
