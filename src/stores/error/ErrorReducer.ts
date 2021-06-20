import { Reducer } from 'redux';
import IAction from 'models/ActionModel';
import ErrorState from './models/ErrorState';

export const initialState: ErrorState = {};

const errorReducer: Reducer = (
  state: ErrorState = initialState,
  action: IAction<any>,
): ErrorState => {
  const { type, error, payload } = action;

  const isError = Boolean(error) && type.includes('_FINISHED');

  const isNewRequestType = type.includes('_REQUEST') && !type.includes('_FINISHED');

  if (isNewRequestType) {
    return initialState;
  }

  if (isError) {
    return {
      ...state,
      [type]: payload,
    };
  }

  return state;
};

export default errorReducer;
