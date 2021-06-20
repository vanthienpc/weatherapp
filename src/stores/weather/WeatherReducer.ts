import { Reducer } from 'redux';
import IAction from 'models/ActionModel';
import { handleReducer } from 'utilities/ReducerUtility';
import * as WeatherType from './WeatherType';
import WeatherState from './models/WeatherState';

export const initialState: WeatherState = {};

const weatherReducer: Reducer = handleReducer(initialState, {
  [WeatherType.FETCH_WEATHER_FINISHED](
    state: WeatherState,
    action: IAction<WeatherState>,
  ): WeatherState {
    return {
      ...state,
      ...action.payload,
    };
  },
});

export default weatherReducer;
