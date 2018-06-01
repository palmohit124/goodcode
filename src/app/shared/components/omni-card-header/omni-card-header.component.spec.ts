import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OmniCardHeaderComponent } from './omni-card-header.component';

describe('OmniCardHeaderComponent', () => {
  let component: OmniCardHeaderComponent;
  let fixture: ComponentFixture<OmniCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmniCardHeaderComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
