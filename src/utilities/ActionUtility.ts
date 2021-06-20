import IAction from 'models/ActionModel';
import { call, put } from 'redux-saga/effects';
import ErrorResponseModel from 'models/ErrorResponseModel';

export function* createSagaEffect<P>(
  action: (...arg: any[]) => IAction<any>,
  effect: (...arg: any[]) => Promise<P | ErrorResponseModel>,
  ...args: any[]
): Generator {
  const response = yield call(effect, ...args);
  const isError: boolean = response instanceof ErrorResponseModel;

  return yield put(action(response, isError));
}

export const createAction = <T = undefined>(
  type: string,
  payload?: T,
  error = false,
  meta: any = null,
): IAction<T> => {
  return { type, payload, error, meta };
};
