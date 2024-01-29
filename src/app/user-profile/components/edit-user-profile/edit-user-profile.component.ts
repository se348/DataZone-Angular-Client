import { UserProfileFacade } from '../../facades/user-profile.facades';
import { RxState } from '@rx-angular/state';
import { UserProfile } from '../../models/user-profile.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

interface CompleteUserProfileComponentState {
  userProfile: UserProfile | null;
}

const initCompleteUserProfileComponentState: CompleteUserProfileComponentState =
  {
    userProfile: null,
  };

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
  providers: [RxState],
})
export class EditUserProfileComponent implements OnInit {
  toggledProperties: { [key: string]: boolean } = {
    isPersonalInfoEditMode: false,
    isLocationEditMode: false,
    isBioEditMode: false,
  };
  imagePreview: string = '';
  userProfileForm!: FormGroup;
  userProfile: UserProfile | null = null;
  userProfile$: Observable<UserProfile | null> =
    this.state.select('userProfile');

  constructor(
    private readonly state: RxState<CompleteUserProfileComponentState>,
    private readonly router: Router,
    private readonly userProfileFacade: UserProfileFacade,
    private readonly formBuilder: FormBuilder
  ) {
    this.state.set(initCompleteUserProfileComponentState);
    this.state.connect('userProfile', this.userProfileFacade.userProfile$);
  }

  ngOnInit(): void {
    this.userProfile$.subscribe(
      (userProfile) => (this.userProfile = userProfile)
    );

    this.userProfileForm = this.formBuilder.group({
      fullName: [this.userProfile?.fullName || ''],
      email: [this.userProfile?.email || ''],
      phoneNumber: [this.userProfile?.phoneNumber || ''],
      address: [this.userProfile?.address || ''],
      bio: [this.userProfile?.bio],
    });
  }

  toggleEdit(property: string) {
    this.toggledProperties[property] = !this.toggledProperties[property];
  }

  // Complate Profile
  editUserProfile(property: string) {
    const { valid, touched, dirty } = this.userProfileForm;

    if (valid && (touched || dirty)) {
      this.userProfileFacade.dispatchEditUserProfile({
        fullName: this.userProfileForm.value.fullName,
        address: this.userProfileForm.value.address,
        email: this.userProfileForm.value.email,
        phoneNumber: this.userProfileForm.value.phoneNumber,
        bio: this.userProfileForm.value.bio,
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
      this.userProfileFacade.dispatchEditUserProfile({
        profileImage: this.imagePreview,
      });
    }
  }
}
