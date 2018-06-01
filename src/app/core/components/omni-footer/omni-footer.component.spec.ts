import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniFooterComponent } from './omni-footer.component';

describe('OmniFooterComponent', () => {
  let component: OmniFooterComponent;
  let fixture: ComponentFixture<OmniFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmniFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
