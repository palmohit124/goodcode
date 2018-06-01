import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniUnauthorizedComponent } from './omni-unauthorized.component';

describe('OmniUnauthorizedComponent', () => {
  let component: OmniUnauthorizedComponent;
  let fixture: ComponentFixture<OmniUnauthorizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmniUnauthorizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
