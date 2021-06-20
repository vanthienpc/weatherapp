import { Reducer } from 'redux';
import IAction from 'models/ActionModel';
import RequestState from './models/RequestState';

export const initialState: RequestState = {};

const requestReducer: Reducer = (
  state: RequestState = initialState,
  action: IAction<any>,
): RequestState => {
  const { type } = action;

  const isRequestType: boolean = type.includes('_REQUEST');

  const requestName: string = type.replace('_FINISHED', '_REQUEST');

  const isRequestFinishedType: boolean = type.includes('_FINISHED');

  if (isRequestType) {
    return {
      ...state,
      [type]: isRequestType,
    };
  }

  if (isRequestFinishedType) {
    return {
      ...state,
      [requestName]: !isRequestFinishedType,
    };
  }

  return state;
};

export default requestReducer;
