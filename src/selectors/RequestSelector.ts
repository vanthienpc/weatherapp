import { createSelector, ParametricSelector } from 'reselect';
import IRequestState from 'stores/request/models/IRequestState';
import IStore from 'models/IStore';

const getRequest = (requestState: IRequestState, actionTypes: string[]): boolean => {
  return actionTypes.some((actionType: string) => requestState[actionType]);
};

export const selectRequest: ParametricSelector<IStore, string[], boolean> = createSelector(
  (state: IStore) => state.request,
  (state: IStore, actionTypes: string[]) => actionTypes,
  getRequest,
);
