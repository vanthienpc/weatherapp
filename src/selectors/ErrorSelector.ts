import { createSelector, ParametricSelector } from 'reselect';
import StoreModel from 'models/StoreModel';
import ErrorState from 'stores/error/models/ErrorState';
import ErrorResponseModel from 'models/ErrorResponseModel';

const getRawError = (errorState: ErrorState, actionTypes: string[]): ErrorState =>
  actionTypes.reduce((partialState: any, actionType: string) => {
    const model: ErrorResponseModel = errorState[actionType];

    if (model) {
      return (partialState[actionType] = model);
    }

    return partialState;
  }, {});

const getErrorText = (errorState: ErrorState, actionTypes: string[]): string => {
  const errorList: string[] = actionTypes.reduce((errorMessages: string[], actionType: string) => {
    const model: ErrorResponseModel = errorState[actionType];

    if (model) {
      const { message, errors } = model;
      const arrayOfErrors: string[] = errors.length ? errors : [message];

      return errorMessages.concat(arrayOfErrors);
    }

    return errorMessages;
  }, []);

  return errorList.join(', ');
};

export const selectError: ParametricSelector<StoreModel, string[], ErrorState> = createSelector(
  (state: StoreModel) => state.error,
  (state: StoreModel, actionTypes: string[]) => actionTypes,
  getRawError,
);

export const selectErrorText: ParametricSelector<StoreModel, string[], string> = createSelector(
  (state: StoreModel) => state.error,
  (state: StoreModel, actionTypes: string[]) => actionTypes,
  getErrorText,
);
