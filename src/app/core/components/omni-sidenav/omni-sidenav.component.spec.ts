import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material';
import { OmniSidenavComponent } from './omni-sidenav.component';

describe('OmniSidenavComponent', () => {
  let component: OmniSidenavComponent;
  let fixture: ComponentFixture<OmniSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule],
      declarations: [OmniSidenavComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render img marchex logo', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const imgElement = compiled.querySelector('img');
    expect(imgElement['src'].includes('assets/logo/marchex-logo-white.png')).toBe(true);
  });
});

