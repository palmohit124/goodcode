import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { Store, StoreModule } from '@ngrx/store';
import { ClientState, reducers } from '../../reducers';
import { OmniProgressSpinnerComponent } from './omni-progress-spinner.component';

describe('OmniProgressSpinnerComponent', () => {
  let component: OmniProgressSpinnerComponent;
  let fixture: ComponentFixture<OmniProgressSpinnerComponent>;
  let store: Store<ClientState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OmniProgressSpinnerComponent],
      imports: [MatProgressSpinnerModule, StoreModule.forRoot(reducers)]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(OmniProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create OmniProgressSpinnerComponent', () => {
    expect(component).toBeTruthy();
  });
});
