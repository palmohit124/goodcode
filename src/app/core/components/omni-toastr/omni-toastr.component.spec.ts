import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastPackage } from 'ngx-toastr';
import { OmniToastrComponent } from './omni-toastr.component';


describe('OmniToasterComponent', () => {
  let component: OmniToastrComponent;
  let fixture: ComponentFixture<OmniToastrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [ToastPackage],
      declarations: [OmniToastrComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
