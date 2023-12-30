import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { CustomStepperComponent } from './custom-stepper/custom-stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';



@NgModule({
  declarations: [
    CustomStepperComponent
  ],
  imports: [
    CommonModule, CdkStepperModule
  ],
  exports:[CustomStepperComponent]
})
export class SharedComponentModule { }
