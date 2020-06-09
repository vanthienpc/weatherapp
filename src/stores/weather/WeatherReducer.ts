import { Reducer } from 'redux';
import IAction from 'models/IAction';
import { handleReducer } from 'utilities/ReducerUtility';
import * as WeatherType from './WeatherType';
import IWeatherState from './models/IWeatherState';

export const initialState: IWeatherState = {};

const weatherReducer: Reducer = handleReducer(initialState, {
  [WeatherType.FETCH_WEATHER_FINISHED](
    state: IWeatherState,
    action: IAction<IWeatherState>,
  ): IWeatherState {
    return {
      ...state,
      ...action.payload,
    };
  },
});

export default weatherReducer;
