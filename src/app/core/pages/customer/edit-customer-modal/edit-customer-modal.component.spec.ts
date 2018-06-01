import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatDialogRef } from '@angular/material';
import { EditCustomerModalComponent } from './edit-customer-modal.component';
import { ClientState, reducers } from '../../../reducers';
import { Store, StoreModule } from '@ngrx/store';
import { Customer } from '../../../../models/customer';

class MatDialogRefMock { }
const mockData: Customer = {
  'id': '0',
  'name': 'Edited Customer',
  'status': 'active',
  'subscriptions': [],
  'href': '/customers/0'
};
describe('EditCustomerModalComponent', () => {
  let component: EditCustomerModalComponent;
  let fixture: ComponentFixture<EditCustomerModalComponent>;
  let store: Store<ClientState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCustomerModalComponent],
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
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(EditCustomerModalComponent);
    component = fixture.componentInstance;
    component.selectedCustomer = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
