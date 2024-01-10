import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedComponentModule } from '../../../shared/shared-component/shared-component.module';
import {
  CdkStep,
  CdkStepper,
  CdkStepperModule,
  StepperOrientation,
  StepperSelectionEvent,
} from '@angular/cdk/stepper';
import { CustomStepperComponent } from 'src/app/shared/shared-component/custom-stepper/custom-stepper.component';
import { RxState } from '@rx-angular/state';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LANDING_PAGE_ROUTE } from 'src/app/core/constants/routes';
import { AuthFacade } from '../../facades/auth.facades';
import { SelectionChange } from '@angular/cdk/collections';
import {
  CompanyProfileResponse,
  IndustryTypes,
} from '../../models/profile.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSelectChange } from '@angular/material/select';

interface LoginComponentState {
  isAuthenticated: boolean;
  companyProfile: CompanyProfileResponse | null;
}

const initLoginComponentState: LoginComponentState = {
  isAuthenticated: false,
  companyProfile: null,
};

@Component({
  selector: 'app-complete-company-profile',
  templateUrl: './complete-company-profile.component.html',
  styleUrl: './complete-company-profile.component.scss',
  providers: [RxState, { provide: CdkStepper }],
})
export class CompleteCompanyProfileComponent {
  isAuthenticated$: Observable<boolean> = this.state.select('isAuthenticated');
  profileControl!: FormGroup;
  documentControl!: FormGroup;
  paymentControl!: FormGroup;
  profilePic?: File;
  businessLicense?:File;


  companyProfile: CompanyProfileResponse | null = null;

  companyProfile$ = this.state.select('companyProfile');

  @Input() submitclicked!: EventEmitter<boolean>;

  totalIndustrytypes = Object.keys(IndustryTypes).length;
  get getIndustryTypes(): Array<string> {
    return Object.keys(IndustryTypes);
  }

  currentStepIndex = 0;
  imageSize = 100;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly state: RxState<LoginComponentState>,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.state.set(initLoginComponentState);
    this.state.connect('isAuthenticated', this.authFacade.isAuthenticated$);
    this.state.connect('companyProfile', this.authFacade.companyProfile$);

    this.profileControl = this.formBuilder.group({
          companyName: ['', [Validators.required]],
          companyEmail: ['', [Validators.required, Validators.email]],
          companyWebSite: [''],
        });
    this.documentControl =  this.formBuilder.group({
      companyAddress: [''],
      industryType: ['', [Validators.required]],
      businessLicense: ['', [Validators.required]],
      profilePicture:['']
    });
    this.paymentControl = this.formBuilder.group({}); 
  }

  ngOnInit(): void {
    this.companyProfile$.subscribe((profile) => {
      this.companyProfile = profile;
    });
    this.isAuthenticated$.subscribe((isAuth) => {
      if (isAuth && this.companyProfile !== null)
        this.router.navigate([LANDING_PAGE_ROUTE]);
    });
    this.currentStepIndexControl.valueChanges.subscribe((value) => {
      this.currentStepIndex = value;
    });
  }
  currentStepIndexControl = new FormControl();

  stepperTitle = 'Complete Company Profile';


  handleSubmitEvent(event: any) {
    if (event) this.saveForm();
  }

  saveForm() {
    const { valid, touched, dirty } = this.profileControl!;
    if (valid && (touched || dirty)) {
      const {
        companyName,
        companyEmail,
        companyWebSite,
        companyAddress,
        industryType,
      } = this.profileControl!.value;
      
      const formData = this.organizeFormData(companyName,
        companyEmail,
        companyWebSite,
        companyAddress,
        industryType,)
      this.authFacade.dispatchCompleteCompanyProfile(formData);
      this.router.navigate([LANDING_PAGE_ROUTE]);
    }
  }

  organizeFormData(
    companyName: string,
    companyEmail: string,
    industryType: IndustryTypes,
    companyWebSite?: string,
    companyAddress?: string): FormData {
    const formData = new FormData();
    formData.append('CompanyName', companyName);
    formData.append('CompanyEmail', companyEmail);
    if(companyWebSite) 
    formData.append('CompanyWebSite', companyWebSite);
  if(companyAddress)
  formData.append('CompanyAddress', companyAddress);
  formData.append('IndustryType', industryType);
  if(this.profilePic)
  formData.append('ProfilePic', this.profilePic);
    
    return formData;
  }

  getProfilePic(file:File){
    this.profilePic = file;
  }
  
  getUploadedLicense(file?:File){
    this.documentControl.controls['businessLicense'].setValue(file);
    if(file) 
    this.businessLicense = file;
  else return 
  }

  getInitials(){

    const names = this.profileControl.controls['companyName'].value.trim().split(' ');
    let initials = '';
    for (let i = 0; i < names.length; i++) {
      if (names[i] !== '') {
        initials += names[i][0]; 
        if (initials.length === 2) {
          break;
        }
      }
    }
    return initials.toUpperCase();    
  }

  handleSelectionChange(index: number) {
    console.log(index);
    this.currentStepIndexControl.setValue(index);
  }
}
