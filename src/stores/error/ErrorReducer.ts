import { Reducer } from 'redux';
import IAction from 'models/IAction';
import IErrorState from './models/IErrorState';

export const initialState: IErrorState = {};

const errorReducer: Reducer = (
  state: IErrorState = initialState,
  action: IAction<any>,
): IErrorState => {
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
