import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowRef } from '../../../providers/window-ref.provider';
import { OmniOauthRedirectComponent } from './omni-oauth-redirect.component';
import { Store, StoreModule } from '@ngrx/store';
import { reducers, getRouterUrl } from '../../../reducers';

class MockWindow {
  closed: boolean;
  posted: any;

  location = {
    outer: this,
    get hostname() {
      return this.outer.host;
    },
    get port() {
      return this.outer.port;
    }
  };

  opener = <any>{
    postMessage: (message: any, targetOrigin: string) => {
      this.posted = [message, targetOrigin];
    }
  };

  constructor(private host: string, private port: number) {
    this.closed = false;
  }

  close() {
    this.closed = true;
  }
}

const CUSTOMER_ID = 3;
const HOST = 'www.blah.com';
const PORT = 1234;
const QUERY_PARAMS = { code: 'authCode', state: 'hi.3' };

describe('OmniOauthRedirectComponent', () => {
  let component: OmniOauthRedirectComponent;
  let fixture: ComponentFixture<OmniOauthRedirectComponent>;
  let mockWindow: MockWindow;
  let store: Store<any>;

  beforeEach(async(() => {
    mockWindow = new MockWindow(HOST, PORT);

    TestBed.configureTestingModule({
      declarations: [OmniOauthRedirectComponent],
      imports: [StoreModule.forRoot(reducers)],
      providers: [
        { provide: WindowRef, useValue: mockWindow },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(OmniOauthRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when initialized', () => {
    it('should set the title of the page', async(() => {
      const titleElement = fixture.nativeElement.querySelector('#title');
      expect(titleElement.innerText).toBe(fixture.componentInstance.oauthRedirectTitle);
    }));
    it('should post the current fragment back to the opener with the expected targetOrigin', async(() => {
      store.select(getRouterUrl)
        .filter(routerState => routerState !== undefined)
        .subscribe(routerState => {
          expect(routerState.state.queryParams).toEqual(QUERY_PARAMS);
          expect(routerState.state.url).toEqual(`https://${HOST}${PORT ? ':' + PORT : ''}/search-analytics/search-account`);
        });
    }));
  });
});
