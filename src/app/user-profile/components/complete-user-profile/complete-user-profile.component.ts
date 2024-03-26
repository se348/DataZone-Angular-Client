import { Component, EventEmitter, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
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
import { AuthFacade } from '../../../auth/facades/auth.facades';
import { UserProfileFacade } from '../../facades/user-profile.facades';
import { UserProfile } from '../../models/user-profile.model';

interface CompleteUserProfileComponentState {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
}

const initCompleteUserProfileComponentState: CompleteUserProfileComponentState =
  {
    isAuthenticated: false,
    userProfile: null,
  };

@Component({
  selector: 'app-complete-user-profile',
  templateUrl: './complete-user-profile.component.html',
  styleUrl: './complete-user-profile.component.scss',
  providers: [RxState, { provide: CdkStepper }],
})
export class CompleteUserProfileComponent {
  isAuthenticated$: Observable<boolean> = this.state.select('isAuthenticated');
  profileControl!: FormGroup;
  paymentControl!: FormGroup;
  profilePic?: File;

  userProfile: UserProfile | null = null;

  userProfile$ = this.state.select('userProfile');

  @Input() submitclicked!: EventEmitter<boolean>;

  currentStepIndex = 0;
  imageSize = 100;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly userProfileFacade: UserProfileFacade,
    private readonly state: RxState<CompleteUserProfileComponentState>,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.state.set(initCompleteUserProfileComponentState);
    this.state.connect('isAuthenticated', this.authFacade.isAuthenticated$);

    this.profileControl = this.formBuilder.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPhoneNumber: [''],
      bio: [''],
    });
    this.paymentControl = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.userProfile$.subscribe((profile) => {
      this.userProfile = profile;
    });
    this.isAuthenticated$.subscribe((isAuth) => {
      if (isAuth && this.userProfile !== null)
        this.router.navigate([LANDING_PAGE_ROUTE]);
    });
    this.currentStepIndexControl.valueChanges.subscribe((value) => {
      this.currentStepIndex = value;
    });
  }
  currentStepIndexControl = new FormControl();

  stepperTitle = 'Complete User Profile';

  handleSubmitEvent(event: any) {
    if (event) this.saveForm();
  }

  saveForm() {
    const { valid, touched, dirty } = this.profileControl!;
    if (valid && (touched || dirty)) {
      const { userName, userEmail, userWebSite, industryType } =
        this.profileControl!.value;

      const formData = this.organizeFormData(
        userName,
        userEmail,
        userWebSite,
        industryType
      );
      this.userProfileFacade.dispatchCompleteUserProfile(formData);
      this.router.navigate([LANDING_PAGE_ROUTE]);
    }
  }

  organizeFormData(
    userName: string,
    userEmail: string,
    userWebSite?: string,
    userAddress?: string
  ): FormData {
    const formData = new FormData();
    formData.append('UserName', userName);
    formData.append('UserEmail', userEmail);
    if (userWebSite) formData.append('UserWebSite', userWebSite);
    if (userAddress) formData.append('UserAddress', userAddress);
    if (this.profilePic) formData.append('ProfilePic', this.profilePic);

    return formData;
  }

  getProfilePic(file: File) {
    this.profilePic = file;
  }

  getInitials() {
    const names = this.profileControl.controls['userName'].value
      .trim()
      .split(' ');
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
    this.currentStepIndexControl.setValue(index);
  }
}
