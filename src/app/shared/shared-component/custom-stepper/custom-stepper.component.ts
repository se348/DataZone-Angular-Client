import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';


export interface CustomStepperEvents{
  showActionButtons: boolean
}
@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrl: './custom-stepper.component.scss',
  providers: [{provide: CdkStepper, useExisting: CustomStepperComponent}],
})
export class CustomStepperComponent extends CdkStepper{

  @Input() stepperTitle = "";

  @Output() submitForm: EventEmitter<boolean> = new EventEmitter();

  isLastStep: boolean = false;

  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
  submit(){
    this.submitForm.emit(true);
  }
  intermediateStep(){
    this.submitForm.emit(false);
  }
 
}
