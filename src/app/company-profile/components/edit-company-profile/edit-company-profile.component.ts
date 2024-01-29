import { EditCompanyProfile } from './../../store/company-profile.actions';
import { CompanyProfileFacade } from '../../facades/company-profile.facades';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyProfile } from './../../models/company-profile.model';
import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { Router } from '@angular/router';

interface EditCompanyProfileComponentState {
  companyProfile: CompanyProfile | null;
}

const initEditCompanyProfileComponentState: EditCompanyProfileComponentState = {
  companyProfile: null,
};

@Component({
  selector: 'app-edit-company-profile',
  templateUrl: './edit-company-profile.component.html',
  styleUrl: './edit-company-profile.component.scss',
})
export class EditCompanyProfileComponent {
  toggledProperties: { [key: string]: boolean } = {
    isCompanyInfoEditMode: false,
    isAddressEditMode: false,
    isCompanyDescriptionEditMode: false,
    isCompanyWebsiteEditMode: false,
  };
  imagePreview: string = '';
  companyProfileForm!: FormGroup;
  companyProfile: CompanyProfile | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly state: RxState<EditCompanyProfileComponentState>,
    private readonly router: Router,
    private readonly companyProfileFacade: CompanyProfileFacade,
    private readonly formBuilder: FormBuilder
  ) {
    this.state.set(initEditCompanyProfileComponentState);
  }

  ngOnInit(): void {
    // Todo send the company id
    this.companyProfileFacade.dispatchGetCompanyProfile('');
    this.companyProfileFacade.companyProfile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((companyProfile) => {
        this.companyProfile = companyProfile;

        this.companyProfileForm = this.formBuilder.group({
          companyName: [companyProfile?.companyName || null],
          email: [companyProfile?.email || null],
          phoneNumber: [companyProfile?.phoneNumber || null],
          address: [companyProfile?.address || null],
          companyDescription: [companyProfile?.companyDescription],
          companyWebsite: [companyProfile?.companyWebsite],
        });

        this.toggledProperties['isCompanyInfoEditMode'] =
          !companyProfile?.companyName ||
          !companyProfile?.email ||
          !companyProfile?.phoneNumber;
        this.toggledProperties['isAddressEditMode'] = !companyProfile?.address;
        this.toggledProperties['isCompanyDescriptionEditMode'] =
          !companyProfile?.companyDescription;
        this.toggledProperties['isCompanyWebsiteEditMode'] =
          !companyProfile?.companyWebsite;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete;
  }

  toggleEdit(property: string) {
    this.toggledProperties[property] = !this.toggledProperties[property];
  }

  // Edit Company Profile

  editCompanyProfile(property: string) {
    const { valid, touched, dirty } = this.companyProfileForm;

    if (valid && (touched || dirty)) {
      this.companyProfileFacade.dispatchEditCompanyProfile({
        companyName:
          this.companyProfileForm.value.companyName ||
          this.companyProfile?.companyName ||
          null,
        address:
          this.companyProfileForm.value.address ||
          this.companyProfile?.address ||
          null,
        companyDescription:
          this.companyProfileForm.value.companyDescription ||
          this.companyProfile?.companyDescription ||
          null,
        phoneNumber:
          this.companyProfileForm.value.phoneNumber ||
          this.companyProfile?.phoneNumber ||
          null,
        email:
          this.companyProfileForm.value.email ||
          this.companyProfile?.email ||
          null,
        companyWebsite:
          this.companyProfileForm.value.companyWebsite ||
          this.companyProfile?.companyWebsite ||
          null,
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
      this.companyProfileFacade.dispatchEditCompanyProfile({
        profileImage: this.imagePreview,
      });
      this.imagePreview = '';
    }
  }
}
