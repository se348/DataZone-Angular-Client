import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { CustomStepperComponent } from './custom-stepper/custom-stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CustomToasterComponent } from './custom-toaster/custom-toaster.component';
import { CustomSpinnerComponent } from './custom-progress-bar/spinner-dotted.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SharedModule } from '../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { MatIconModule } from '@angular/material/icon';
import { SuccessIndicatorComponent } from './success-indicator/success-indicator.component';
import { ErrorIndicatorComponent } from './error-indicator/error-indicator.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { CustomSearchBarComponent } from './custom-search-bar/custom-search-bar.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CustomStepperComponent,
    DragDropComponent,
    ProfilePictureComponent,
    CustomSpinnerComponent,
    CustomToasterComponent,
    CustomSearchBarComponent,
    TopNavBarComponent,
    SideNavBarComponent,
    SuccessIndicatorComponent,
    SuccessPageComponent,
    ErrorIndicatorComponent,
  ],
  imports: [
    CommonModule,
    CdkStepperModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSortModule,
    MatSelectModule,
    MatCardModule,
    MatStepperModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatBadgeModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTreeModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSliderModule,
    RouterModule,
  ],
  exports: [
    CustomStepperComponent,
    CustomToasterComponent,
    DragDropComponent,
    ProfilePictureComponent,
    CustomSearchBarComponent,
    TopNavBarComponent,
    SideNavBarComponent,
    SuccessIndicatorComponent,
    SuccessPageComponent,
    ErrorIndicatorComponent,
  ],
})
export class SharedComponentModule {}
