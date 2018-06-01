import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA, MatCardModule, MatSelectModule, MatInputModule } from '@angular/material';
import { RefdomDialogComponent } from './refdom-dialog.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { TagManagementState, reducers } from '../../../../../reducers';
import { ToastService } from '../../../../../../core/services/toastr/toast.service';
import { ToastrModule } from 'ngx-toastr';

describe('RefdomDialogComponent', () => {
  let component: RefdomDialogComponent;
  let fixture: ComponentFixture<RefdomDialogComponent>;
  let store: Store<TagManagementState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RefdomDialogComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers),
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        ToastService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(RefdomDialogComponent);
    component = fixture.componentInstance;
    component.data = {};
    component.data.sources = [];
    component.data.domain = 'any';
    fixture.detectChanges();
  });

  it('should create RefdomDialogComponent', () => {
    expect(component).toBeTruthy();
  });
});
