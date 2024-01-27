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
import { SuccessIndicatorComponent } from "./success-indicator/success-indicator.component";
import { ErrorIndicatorComponent } from "./error-indicator/error-indicator.component";
import { SuccessPageComponent } from './success-page/success-page.component';



@NgModule({
    declarations: [
        CustomStepperComponent, DragDropComponent, ProfilePictureComponent, CustomSpinnerComponent, CustomToasterComponent, SuccessPageComponent
    ],
    exports: [CustomStepperComponent, CustomToasterComponent, DragDropComponent, ProfilePictureComponent],
    imports: [
        CommonModule,
        CdkStepperModule, ReactiveFormsModule, MatIconModule,
        SuccessIndicatorComponent,
        ErrorIndicatorComponent
    ]
})
export class SharedComponentModule { }
