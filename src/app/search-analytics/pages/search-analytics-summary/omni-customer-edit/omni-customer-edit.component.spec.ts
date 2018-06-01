import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ClientState, reducers } from '../../../../core/reducers';
import { OmniCustomerEditComponent } from './omni-customer-edit.component';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';
import { MatDialogModule } from '@angular/material';

describe('OmniCustomerEditComponent', () => {
  let component: OmniCustomerEditComponent;
  let fixture: ComponentFixture<OmniCustomerEditComponent>;
  let store: Store<ClientState>;

  beforeEach(async(() => {
    const clientConfigServiceStub = {
      get() {
        const routes = {
          routes: {
            routesWithoutNav: []
          }
        };
        return routes;
      }
    };

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        MatDialogModule
      ],
      declarations: [OmniCustomerEditComponent],
      providers: [
        { provide: ClientConfigService, useValue: clientConfigServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);

    fixture = TestBed.createComponent(OmniCustomerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create OmniCustomerEditComponent', () => {
    expect(component).toBeTruthy();
  });
});
