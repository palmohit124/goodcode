import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OmniSearchComponent } from './omni-search.component';

describe('OmniSearchComponent', () => {
  let component: OmniSearchComponent;
  let fixture: ComponentFixture<OmniSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmniSearchComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create OmniSearchComponent', () => {
    expect(component).toBeTruthy();
  });
});
