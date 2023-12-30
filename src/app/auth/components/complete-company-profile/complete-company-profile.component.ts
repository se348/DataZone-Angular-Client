import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedComponentModule } from '../../../shared/shared-component/shared-component.module';
import {
  CdkStep,
  CdkStepper,
  CdkStepperModule,
  StepperSelectionEvent,
} from '@angular/cdk/stepper';
import { CustomStepperComponent } from 'src/app/shared/shared-component/custom-stepper/custom-stepper.component';
import { RxState } from '@rx-angular/state';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LANDING_PAGE_ROUTE } from 'src/app/core/constants/routes';
import { AuthFacade } from '../../facades/auth.facades';
import { SelectionChange } from '@angular/cdk/collections';
import { CompanyProfileRequest, CompanyProfileResponse, IndustryTypes } from '../../models/profile.model';

interface LoginComponentState {
  isAuthenticated: boolean;
  companyProfile: CompanyProfileResponse | null;
}

const initLoginComponentState: LoginComponentState = {
  isAuthenticated: false,
  companyProfile: null
};

@Component({
  selector: 'app-complete-company-profile',
  templateUrl: './complete-company-profile.component.html',
  styleUrl: './complete-company-profile.component.scss',
  providers: [RxState, { provide: CdkStepper }],
})
export class CompleteCompanyProfileComponent {
  isAuthenticated$: Observable<boolean> = this.state.select('isAuthenticated');
  completeProfileForm!: FormGroup;

  companyProfile :CompanyProfileResponse | null = null;

  companyProfile$ = this.state.select('companyProfile');

  @Input() submitclicked!: EventEmitter<boolean>;

  totalIndustrytypes = Object.keys(IndustryTypes).length;
  get getIndustryTypes(): Array<string> {
    return Object.keys(IndustryTypes);
  }


  progressBarValue = 0;
  currentStepIndex = 0;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly state: RxState<LoginComponentState>,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.state.set(initLoginComponentState);
    this.state.connect('isAuthenticated', this.authFacade.isAuthenticated$);
    this.state.connect('companyProfile', this.authFacade.companyProfile$);
    this.completeProfileForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyWebSite: [''],
      companyAddress: [''],
      industryType:['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.companyProfile$.subscribe((profile) => {
      this.companyProfile =profile
    });
    this.isAuthenticated$.subscribe((isAuth) => {
      if (isAuth && this.companyProfile !== null ) this.router.navigate([LANDING_PAGE_ROUTE]);
    });
    this.currentStepIndexControl.valueChanges.subscribe((value) => {
      this.currentStepIndex = value;
      this.handleProgressState(value);
    });
  }
  currentStepIndexControl = new FormControl();

  stepperTitle = 'Complete Company Profile';

  progressStatus = [
    {
      stepNo: 1,
      stepDesc: 'Company address and website',
    },
    {
      stepNo: 2,
      stepDesc: 'Payment Information',
    },
  ];

  handleSubmitEvent(event: any) {
    if (event) this.saveForm();
  }

  handleProgressState(index: number) {
    this.progressBarValue = ((index + 1) * 100) / 2;
  }

  handleProgressList(listIndex: number) {
    if (this.currentStepIndex > listIndex) return false;
    return true;
  }

  saveForm() {
    const { valid, touched, dirty } = this.completeProfileForm;
    if (valid && (touched || dirty)) {
      const {
        companyName,
        companyEmail,
        companyWebSite,
        companyAddress,
        industryType
      } = this.completeProfileForm.value;
      const request: CompanyProfileRequest = {
        CompanyName: companyName,
        ContactEmail: companyEmail,
        CompanyWebsite: companyWebSite,
        Address: companyAddress,
        IndustryType: industryType
      };
      this.authFacade.dispatchCompleteCompanyProfile(request);
      this.router.navigate([LANDING_PAGE_ROUTE]);
    }
  }

  handleSelectionChange(event: StepperSelectionEvent) {
    this.currentStepIndexControl.setValue(event.selectedIndex);
  }
}
