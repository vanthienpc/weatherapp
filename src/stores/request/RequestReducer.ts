import { Reducer } from 'redux';
import IAction from 'models/IAction';
import IRequestState from './models/IRequestState';

export const initialState: IRequestState = {};

const requestReducer: Reducer = (
  state: IRequestState = initialState,
  action: IAction<any>,
): IRequestState => {
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
