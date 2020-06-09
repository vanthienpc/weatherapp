import { selectError, selectErrorText } from './ErrorSelector';
import ErrorResponseModel from 'models/ErrorResponseModel';
import IErrorState from 'stores/error/models/IErrorState';

let store: any;
let errorResponseModel: any;
const actionType: string = 'SomeAction.REQUEST_TEST_FINISHED';

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
    const expectedText: string = '';

    expect(actualText).toEqual(expectedText);
  });
});

describe('selectError', () => {
  it('should return same error model', () => {
    const actualResult: IErrorState = selectError(store, [actionType]);
    const expectedResult: IErrorState = store.error[actionType];

    expect(actualResult).toBe(expectedResult);
  });

  it('should return undefined value', () => {
    const actualResult: IErrorState = selectError(store, ['noop']);
    const expectedResult: any = {
      [actionType]: undefined,
    };

    expect(actualResult[actionType]).toBe(expectedResult[actionType]);
  });
});
