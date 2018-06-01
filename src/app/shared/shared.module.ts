import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatTooltipModule
} from '@angular/material';

import {
  OmniSearchComponent,
  OmniConfirmationComponent,
  OmniCardHeaderComponent
} from './components';

const MaterialModules = [
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatSnackBarModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatTableModule,
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatTooltipModule
];


@NgModule({
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ...MaterialModules,
    ReactiveFormsModule,
    RouterModule,
    OmniSearchComponent,
    OmniConfirmationComponent,
    OmniCardHeaderComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, FlexLayoutModule, MatProgressSpinnerModule],
  declarations: [OmniSearchComponent, OmniConfirmationComponent, OmniCardHeaderComponent],
  entryComponents: [OmniConfirmationComponent]
})
export class SharedModule {
}
