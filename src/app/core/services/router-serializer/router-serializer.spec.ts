import {ActivatedRouteSnapshot, Params, RouterStateSnapshot} from '@angular/router';
import {CustomRouterStateSerializer} from './router-serializer';

class MockRouterStateSnapshot implements RouterStateSnapshot {
  url: string;

  root: ActivatedRouteSnapshot;

  constructor(expectedUrl: string, expectedParams: Params) {
    this.url = expectedUrl;
    this.root = new ActivatedRouteSnapshot();
    this.root.queryParams = expectedParams;
  }

  toString(): string {
    throw new Error('Method not implemented.');
  }
}

describe('The router serializer', () => {
  describe('when serialize is invoked with a router state', () => {
    it('should return a copy of the url', () => {
      const expectedUrl = 'a url string';
      const snapshot = new MockRouterStateSnapshot(expectedUrl, null);

      const serializer = new CustomRouterStateSerializer();
      const result = serializer.serialize(snapshot);

      expect(result.url).toEqual(expectedUrl);
    });

    it('should return a copy of the query parameters', () => {
      const expectedQueryParams: Params = {};
      const snapshot = new MockRouterStateSnapshot(null, expectedQueryParams);

      const serializer = new CustomRouterStateSerializer();
      const result = serializer.serialize(snapshot);

      expect(result.queryParams).toEqual(expectedQueryParams);
    });
  });
});
