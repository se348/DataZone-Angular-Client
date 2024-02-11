import { Component, EventEmitter, Input, Output, ElementRef, ViewChild, inject } from '@angular/core';
import {
  CdkStepper,
} from '@angular/cdk/stepper';
import { RxState } from '@rx-angular/state';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { DatasetFacade } from 'src/app/data-marketplace/facades/dataset.facades';

@Component({
  selector: 'app-dataset-upload-form',
  templateUrl: './dataset-upload-form.component.html',
  styleUrl: './dataset-upload-form.component.scss',
  providers: [RxState, { provide: CdkStepper }],
})

export class DatasetUploadFormComponent {
  fileControl!: FormGroup;
  datasetControl!: FormGroup;
  businessLicense?:File;
  noPrice: boolean = false;
  noDownloadability: boolean= false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = ['Educational'];
  allTags: string[] = ['Educational', 'Agriculture', 'Technology'];

  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;
  
  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  @Input() submitclicked!: EventEmitter<boolean>;

  currentStepIndex = 0;
  imageSize = 100;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly datasetFacade: DatasetFacade
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTags.slice())),
    );
    this.fileControl = this.formBuilder.group({
          file: ['', [Validators.required]]
        });
    this.datasetControl =  this.formBuilder.group({
      datasetName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [{ value: '', disabled: true }], // Disable initially
      terms: [{ value: '', disabled: true }], 
      isDownloadable: [{value: false, disabled: true}],
      liscence: [{value: '', disabled: true}],
      Visibility : ['false', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentStepIndexControl.valueChanges.subscribe((value) => {
      this.currentStepIndex = value;
    });
    this.datasetControl.get('price')?.valueChanges.subscribe((value: string) => {
      if (value== ''){
        this.noPrice = true
      }
      else{
        this.noPrice = false
      }
    })
    this.datasetControl.get('isDownloadable')?.valueChanges.subscribe((value: string) => {
      if (value== ''){
        this.noDownloadability = true
      }
      else{
        this.noDownloadability = false
      }
      console.log(this.noDownloadability)
    })
    this.datasetControl.get('Visibility')?.valueChanges.subscribe((value: string) => {
      const priceControl = this.datasetControl.get('price');
      const termsControl = this.datasetControl.get('terms');
      const isDownloadableControl =  this.datasetControl.get("isDownloadable")
      const liscenceControl = this.datasetControl.get("liscence")
      
      if (value == 'true') {
        priceControl?.enable();
        termsControl?.enable();
        liscenceControl?.enable();
        isDownloadableControl?.enable();
        priceControl?.setValidators([Validators.required]);
        isDownloadableControl?.setValidators([Validators.required])
      } else {
        // If visibility is false, disable and make controls optional
        priceControl?.disable();
        termsControl?.disable();
        liscenceControl?.disable();
        isDownloadableControl?.disable();
        priceControl?.setValidators(null);
        isDownloadableControl?.setValidators(null);
      }
  }

  
  )}

 
  currentStepIndexControl = new FormControl();
  
  handleSubmitEvent() {
    this.saveForm();
  }

  saveForm() {
      if ((this.noDownloadability || this.noPrice) && (this.datasetControl.get('Visibility')?.value == 'true')){
        return;
      }
      const {
        datasetName, 
        description, 
        isDownloadable, 
        price, 
        terms, 
        visibility,
        liscence
      } = this.datasetControl!.value;
      
      this.datasetFacade.dispatchUploadDataset({
        name: datasetName,
        description,
        isDownloadable,
        price,
        terms,
        file: this.fileControl.value.file,
        isPrivate: visibility == 'false',
        license: liscence,
        tags: this.tags ?? [],
      })
    
    }
  getUploadedFile(file?:File){
    this.fileControl.setValue({file})
    }
}
