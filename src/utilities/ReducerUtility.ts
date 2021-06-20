import { Reducer } from 'redux';
import IAction from 'models/ActionModel';

type ReducerMethod<T> = (state: T, action: IAction<any>) => T;
type ReducerMethods<T> = { [actionType: string]: ReducerMethod<T> };

export const handleReducer = <T = any>(initialState: T, methods: ReducerMethods<T>): Reducer<T> => {
  return (state: T = initialState, action: IAction<any>): T => {
    const method: ReducerMethod<T> | undefined = methods[action.type];

    if (!method || action.error) {
      return initialState;
    }

    return method(state, action);
  };
};
