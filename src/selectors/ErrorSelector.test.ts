import { selectError, selectErrorText } from './ErrorSelector';
import ErrorResponseModel from 'models/ErrorResponseModel';
import ErrorState from 'stores/error/models/ErrorState';

let store: any;
let errorResponseModel: any;
const actionType = 'SomeAction.REQUEST_TEST_FINISHED';

beforeEach(() => {
  errorResponseModel = new ErrorResponseModel();

  errorResponseModel.errors = ['Unknown'];

  store = {
    error: {
      [actionType]: errorResponseModel,
    },
  };
});

describe('selectErrorText', () => {
  it('should return error text from error model', () => {
    const actualText: string = selectErrorText(store, [actionType]);
    const expectedText: string = errorResponseModel.errors.join(', ');

    expect(actualText).toEqual(expectedText);
  });

  it('should return empty string', () => {
    const actualText: string = selectErrorText(store, ['noop']);
    const expectedText = '';

    expect(actualText).toEqual(expectedText);
  });
});

describe('selectError', () => {
  it('should return same error model', () => {
    const actualResult: ErrorState = selectError(store, [actionType]);
    const expectedResult: ErrorState = store.error[actionType];

    expect(actualResult).toBe(expectedResult);
  });

  it('should return undefined value', () => {
    const actualResult: ErrorState = selectError(store, ['noop']);
    const expectedResult: any = {
      [actionType]: undefined,
    };

    expect(actualResult[actionType]).toBe(expectedResult[actionType]);
  });
});
