import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { CustomStepperComponent } from './custom-stepper/custom-stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SharedModule } from '../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CustomStepperComponent, DragDropComponent, ProfilePictureComponent
  ],
  imports: [
    CommonModule, CdkStepperModule, ReactiveFormsModule, MatIconModule
  ],
  exports:[CustomStepperComponent, DragDropComponent, ProfilePictureComponent]
})
export class SharedComponentModule { }
