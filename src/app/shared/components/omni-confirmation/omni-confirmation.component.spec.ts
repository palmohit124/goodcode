import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OmniConfirmationComponent } from './omni-confirmation.component';

describe('OmniConfirmationComponent', () => {
  let component: OmniConfirmationComponent;
  let fixture: ComponentFixture<OmniConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmniConfirmationComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create OmniConfirmationComponent', () => {
    expect(component).toBeTruthy();
  });
});
