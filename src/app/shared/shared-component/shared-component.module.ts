import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { CustomStepperComponent } from './custom-stepper/custom-stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CustomToasterComponent } from './custom-toaster/custom-toaster.component';
import { CustomSpinnerComponent } from './custom-progress-bar/spinner-dotted.component';



@NgModule({
  declarations: [
    CustomStepperComponent,CustomSpinnerComponent, CustomToasterComponent
  ],
  imports: [
    CommonModule, 
    CdkStepperModule
  ],
  exports:[CustomStepperComponent, CustomToasterComponent]
})
export class SharedComponentModule { }
