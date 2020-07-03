import IAction from 'models/IAction';
import ErrorResponseModel from 'models/ErrorResponseModel';

export function createEpicResponse(
  action: (...arg: any[]) => IAction<any>,
  response: any,
): IAction<any> {
  const isError: boolean = response instanceof ErrorResponseModel;
  const payload = isError ? response : response.data;

  return action(payload, isError);
}

export const createAction = <T = undefined>(
  type: string,
  payload?: T,
  error: boolean = false,
  meta: any = null,
): IAction<T> => {
  return { type, payload, error, meta };
};
