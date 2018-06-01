import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OmniToolbarComponent } from './omni-toolbar.component';
import { OmniSidenavComponent } from '..';
import { ClientState, reducers } from '../../reducers';
import { SharedModule } from '../../../shared/shared.module';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material';


describe('OmniToolbarComponent', () => {
  let component: OmniToolbarComponent;
  let fixture: ComponentFixture<OmniToolbarComponent>;
  let store: Store<ClientState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        MatListModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        OmniToolbarComponent,
        OmniSidenavComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(OmniToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when a user is bound', () => {
    it('should render the user\'s name to the view', () => {
      const expectedUser = {
        name: 'Gary Skies',
        user_id: 'a user id',
        email: 'an@email.com',
        nickname: 'a nickname',
        picture: 'http://www.google.com/favicon.ico'
      };
      component.user = expectedUser;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('span.username'));
      expect(el.nativeElement.innerText).toEqual(expectedUser.name);
    });
  });

  describe('when a customer list route is active', () => {
    it('should render img marchex logo', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const imgElement = compiled.querySelector('img');
      expect(imgElement['src'].includes('assets/logo/marchex-wordmark-white-small.png')).toBe(true);
    });
  });
});
