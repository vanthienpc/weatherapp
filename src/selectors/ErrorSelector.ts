import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import IErrorState from 'stores/error/models/IErrorState';
import ErrorResponseModel from 'models/ErrorResponseModel';

const getRawError = (errorState: IErrorState, actionTypes: string[]): IErrorState =>
  actionTypes.reduce((partialState: any, actionType: string) => {
    const model: ErrorResponseModel = errorState[actionType];

    if (model) {
      return (partialState[actionType] = model);
    }

    return partialState;
  }, {});

const getErrorText = (errorState: IErrorState, actionTypes: string[]): string => {
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

export const selectError: ParametricSelector<IStore, string[], IErrorState> = createSelector(
  (state: IStore) => state.error,
  (state: IStore, actionTypes: string[]) => actionTypes,
  getRawError,
);

export const selectErrorText: ParametricSelector<IStore, string[], string> = createSelector(
  (state: IStore) => state.error,
  (state: IStore, actionTypes: string[]) => actionTypes,
  getErrorText,
);
