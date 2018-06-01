import {LocalStorage} from './local-storage';
import {NoOpLogger} from '../logger/no-op-logger';
import {cold} from 'jasmine-marbles';
import SpyObj = jasmine.SpyObj;

interface TestData {
  a: number;
  b: number;
}

describe('Local Storage', () => {
  const logger = new NoOpLogger();
  let service: LocalStorage;
  let mockStorage: SpyObj<Storage>;

  const exampleData: TestData = {
    a: 1,
    b: 2,
  };

  beforeEach(() => {
    mockStorage = jasmine.createSpyObj('', ['getItem', 'setItem', 'removeItem']);
    service = new LocalStorage(logger, mockStorage);
  });

  describe('getItem', () => {
    describe('when item available and can be parsed', () => {
      it('should emit the parsed object', () => {
        const item = JSON.stringify(exampleData);
        const expected = cold('(a|)', {a: exampleData});
        const expectedKey = 'getItemKey';
        mockStorage.getItem.and.returnValue(item);

        expect(service.getItem(expectedKey)).toBeObservable(expected);
      });
    });
    describe('when item available but cannot be parsed', () => {
      it('should emit the parsed object', () => {
        const item = '{badjson{';
        const expectedError = 'Error parsing data from localstorage';
        const expected = cold('#', {}, expectedError);
        const key = 'getItemKey';
        mockStorage.getItem.and.returnValue(item);

        expect(service.getItem(key)).toBeObservable(expected);
      });
    });
    describe('when there is no item available with that key', () => {
      it('should emit null', () => {
        const expected = cold('(a|)', {a: null});
        const expectedKey = 'getItemKey';
        mockStorage.getItem.and.returnValue(null);

        expect(service.getItem(expectedKey)).toBeObservable(expected);
      });
    });
    describe('when localstorage is inaccessible or some other error occurs', () => {
      it('should cause the observable to fail', () => {
        const item = JSON.stringify(exampleData);
        const expectedError = 'Failed to load from localStorage';
        const expected = cold('#', {}, expectedError);
        const expectedKey = 'getItemKey';
        mockStorage.getItem.and.throwError('explode');
        expect(service.getItem(expectedKey)).toBeObservable(expected);
      });
    });
  });

  describe('setItem', () => {
    describe('when the item is saved successfully', () => {
      it('should emit {} to indicate completion', () => {
        const expected = cold('(a|)', {a: {}});

        const actual = service.setItem('aKey', exampleData);
        expect(actual).toBeObservable(expected);
        expect(mockStorage.setItem).toHaveBeenCalledWith('aKey', JSON.stringify(exampleData));
      });
    });
    describe('when the item fails to save', () => {
      it('should cause the observable to fail', () => {
        const expectedError = 'Failed to save to localStorage';
        const expected = cold('#', null, expectedError);
        mockStorage.setItem.and.throwError(expectedError);

        const actual = service.setItem('aKey', JSON.stringify(exampleData));
        expect(actual).toBeObservable(expected);
      });
    });
  });

  describe('removeItem', () => {
    describe('when it succeeds', () => {
      it('should emit {} to indicate completion', () => {
        const expectedKey = 'removeItemKey';

        const expected = cold('(a|)', {a: {}});
        expect(service.removeItem(expectedKey)).toBeObservable(expected);
        expect(mockStorage.removeItem).toHaveBeenCalledWith(expectedKey);
      });
    });
    describe('when it fails', () => {
      it('should cause the observable to fail', () => {
        const expectedError = 'Failed to remove item from localstorage';
        const expectedKey = 'getItemKey';
        mockStorage.removeItem.and.throwError(expectedError);

        const expected = cold('#', {}, expectedError);
        expect(service.removeItem(expectedKey)).toBeObservable(expected);
      });
    });
  });

});
