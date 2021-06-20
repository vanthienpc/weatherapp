import { createSelector, ParametricSelector } from 'reselect';
import RequestState from 'stores/request/models/RequestState';
import StoreModel from 'models/StoreModel';

const getRequest = (requestState: RequestState, actionTypes: string[]): boolean => {
  return actionTypes.some((actionType: string) => requestState[actionType]);
};

export const selectRequest: ParametricSelector<StoreModel, string[], boolean> = createSelector(
  (state: StoreModel) => state.request,
  (state: StoreModel, actionTypes: string[]) => actionTypes,
  getRequest,
);
