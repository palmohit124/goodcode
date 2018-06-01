import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as fromRoot from '../../../../../core/reducers';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatCardModule, MatSelectModule, MatInputModule } from '@angular/material';
import { CreateRuleDialogComponent } from './create-rule-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagManagementState, reducers } from '../../../../reducers';
import { Observable } from 'rxjs/Observable';

class MatDialogRefMock {
  afterClosed() {
    return Observable.of(null);
  }
}


describe('CreateRuleDialogComponent', () => {
  let component: CreateRuleDialogComponent;
  let fixture: ComponentFixture<CreateRuleDialogComponent>;
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
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tagManagement': combineReducers(reducers)
        }),
      ],
      declarations: [CreateRuleDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useClass: MatDialogRefMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CreateRuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CreateRuleDialogComponent', () => {
    expect(component).toBeTruthy();
  });
});
