import { UserProfileFacade } from './../../facades/user-profile.facades';
import { RxState } from '@rx-angular/state';
import { UserProfile } from './../../models/user-profile.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface CompleteUserProfileComponentState {
  userProfile: UserProfile | null;
}

const initCompleteUserProfileComponentState: CompleteUserProfileComponentState =
  {
    userProfile: null,
  };

@Component({
  selector: 'app-complete-user-profile',
  templateUrl: './complete-user-profile.component.html',
  styleUrls: ['./complete-user-profile.component.scss'],
})
export class CompleteUserProfileComponent implements OnInit, OnDestroy {
  toggledProperties: { [key: string]: boolean } = {
    isPersonalInfoEditMode: false,
    isLocationEditMode: false,
    isBioEditMode: false,
  };
  imagePreview: string = '';
  userProfileForm!: FormGroup;
  userProfile: UserProfile | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly state: RxState<CompleteUserProfileComponentState>,
    private readonly router: Router,
    private readonly userProfileFacade: UserProfileFacade,
    private readonly formBuilder: FormBuilder
  ) {
    this.state.set(initCompleteUserProfileComponentState);
  }

  ngOnInit(): void {
    this.userProfileFacade.dispatchGetUserProfile('');
    this.userProfileFacade.userProfile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userProfile) => {
        this.userProfile = userProfile;

        this.userProfileForm = this.formBuilder.group({
          fullName: [userProfile?.fullName || ''],
          email: [userProfile?.email || ''],
          phoneNumber: [userProfile?.phoneNumber || ''],
          country: [userProfile?.country || ''],
          bio: [userProfile?.bio],
          // ... other form fields
        });

        this.toggledProperties['isPersonalInfoEditMode'] =
          !userProfile?.fullName ||
          !userProfile?.email ||
          !userProfile?.phoneNumber;
        this.toggledProperties['isLocationEditMode'] = !userProfile.country;
        this.toggledProperties['isBioEditMode'] = !userProfile.bio;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleEdit(property: string) {
    this.toggledProperties[property] = !this.toggledProperties[property];
  }

  // Complate Profile
  completeProfile(property: string) {
    const { valid, touched, dirty } = this.userProfileForm;

    if (valid && (touched || dirty)) {
      this.userProfileFacade.dispatchCompeleteUserProfile({
        fullName:
          this.userProfileForm.value.fullName ||
          this.userProfile?.fullName ||
          null,
        country:
          this.userProfileForm.value.country ||
          this.userProfile?.country ||
          null,
        email:
          this.userProfileForm.value.email || this.userProfile?.email || null,
        phoneNumber:
          this.userProfileForm.value.phoneNumber ||
          this.userProfile?.phoneNumber ||
          null,
        bio: this.userProfileForm.value.bio || this.userProfile?.bio,
      });
    }

    this.toggleEdit(property);
  }

  // Select Profile Image
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(inputNode.files[0]);
    }
  }

  // Submit Image
  saveImage() {
    if (this.imagePreview !== '') {
      this.userProfileFacade.dispatchCompeleteUserProfile({
        profileImage: this.imagePreview,
      });
    }
  }
}
