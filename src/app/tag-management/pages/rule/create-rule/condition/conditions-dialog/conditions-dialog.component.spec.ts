import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA , MatCardModule,  MatSelectModule,  MatInputModule} from '@angular/material';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ConditionsDialogComponent } from './conditions-dialog.component';
import { TagManagementState, reducers } from '../../../../../reducers';


describe('ConditionsDialogComponent', () => {
  let component: ConditionsDialogComponent;
  let fixture: ComponentFixture<ConditionsDialogComponent>;
  let store: Store<TagManagementState>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [ConditionsDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ConditionsDialogComponent);
    component = fixture.componentInstance;
    component.data = {};
    component.data.source = '';
    component.data.searchParameters = '';
    component.data.disabledSources = [];
    component.disabledConditionSources = [];
    fixture.detectChanges();
  });

  it('should create ConditionsDialogComponent', () => {
    expect(component).toBeTruthy();
  });
});
