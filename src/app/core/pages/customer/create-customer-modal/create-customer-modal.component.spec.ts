import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {Store, StoreModule} from '@ngrx/store';
import {ClientState, reducers} from '../../../reducers';
import { MatInputModule, MatDialogRef } from '@angular/material';
import { CreateCustomerModalComponent } from './create-customer-modal.component';

class MatDialogRefMock { }

describe('CreateCustomerModalComponent', () => {
  let component: CreateCustomerModalComponent;
  let fixture: ComponentFixture<CreateCustomerModalComponent>;
  let store: Store<ClientState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCustomerModalComponent ],
      imports: [
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CreateCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
