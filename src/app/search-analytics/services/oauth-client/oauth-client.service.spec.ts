import { async, TestBed, inject } from '@angular/core/testing';

import { OauthClientService, REQUEST_ID_FACTORY } from './oauth-client.service';
import { POPUP_FACTORY } from '../../../core/providers/popup-factory.provider';
import { WindowRef } from '../../../core/providers/window-ref.provider';

class MessageListenerWindow {
  public event: any;
  public listeners: number;

  constructor() {
    this.event = null;
  }

  addEventListener(type: string, listener: any) {
    expect(type).toBe('message');
    this.listeners++;
    if (event) {
      listener(this.event);
    }
  }

  removeEventListener(type: string, listener: any) {
    expect(type).toBe('message');
    this.event = null;
  }
}

describe('OauthClientService', () => {
  let mockWindow;
  let mockPopupFactory;
  let popupCount;
  let popupUrls;

  const authHost = 'auth.host';
  const clientId = 'client';
  const redirectUri = 'redirect.uri';
  const scopes = ['scope1', 'scope2'];
  const customerIdAsString = '1010';
  const requestId = 'requestid';
  const additionalOptions = {
    option1: 'blah',
    option2: 'bleh'
  };

  const authUrl = `${authHost}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(' ')}&option1=blah&option2=bleh`;
  const expectedState = requestId + '.' + customerIdAsString;
  const expectedAuthUrl = `${authUrl}}&state=${requestId}.${customerIdAsString}`;

  const authCode = 'authcode';
  const successfulEvent = new MessageEvent('post', { data: { state: expectedState, code: authCode } });

  const noCodeMsg = 'Authorization code not returned by authorization server';
  const noCodeEvent = new MessageEvent('post', { data: { state: expectedState } });

  const errMsg = 'blargh';
  const errorEvent = new MessageEvent('post', { data: { state: expectedState, error: errMsg } });

  function unexpectedError(error) {
    fail('Did not expect an Error. Got: ' + error);
  }

  function unexpectedSuccess(success) {
    fail('Did not expect a Success. Got: ' + success);
  }

  beforeEach(() => {
    mockWindow = new MessageListenerWindow();
    popupCount = 0;
    popupUrls = [];
    mockPopupFactory = (url) => {
      popupCount++;
      popupUrls.push(url);
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: POPUP_FACTORY, useValue: mockPopupFactory },
        { provide: WindowRef, useValue: mockWindow },
        { provide: REQUEST_ID_FACTORY, useValue: () => requestId },
        OauthClientService
      ]
    });
  });


  describe('when starting the authorization code flow', () => {
    it('should set up the event listener', async(inject([OauthClientService], (instance) => {
      instance.grant(authUrl, customerIdAsString).subscribe(() => {
        expect(mockWindow.listeners).toEqual(1);
      }, unexpectedError);
    })));

    it('should open the popup window', async(inject([OauthClientService], (instance) => {
      instance.grant(authUrl, customerIdAsString).subscribe(() => {
        expect(popupCount).toEqual(1, 'popup count');
        expect(popupUrls[0]).toEqual(expectedAuthUrl);
      });
    })));

    it('should return the successful listener result as an observable', async(inject([OauthClientService], (instance) => {
      mockWindow.event = successfulEvent;

      instance.grant(authUrl, customerIdAsString).subscribe(code => {
        expect(code).toEqual(authCode);
      }, unexpectedError);
    })));

    it('should return a no code listener result as a failed observable', async(inject([OauthClientService], (instance) => {
      mockWindow.event = noCodeEvent;
      instance.grant(authUrl, customerIdAsString).subscribe(unexpectedSuccess, err => expect(err.message).toEqual(noCodeMsg));
    })));

    it('should return the error listener result as a failed observable', async(inject([OauthClientService], (instance) => {
      mockWindow.event = errorEvent;
      instance.grant(authUrl, customerIdAsString).subscribe(unexpectedSuccess, err => expect(err.message).toEqual(errMsg));
    })));
  });
});
