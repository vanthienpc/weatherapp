import IAction from 'models/IAction';
import * as WeatherType from './WeatherType';
import * as ActionUtility from 'utilities/ActionUtility';

export const fetchWeatherRequest = (payload: string): IAction<string> => {
  return ActionUtility.createAction(WeatherType.FETCH_WEATHER_REQUEST, payload);
};

export const fetchWeatherFinished = (payload: any, error: boolean): IAction<any> => {
  return ActionUtility.createAction(WeatherType.FETCH_WEATHER_FINISHED, payload, error);
};
