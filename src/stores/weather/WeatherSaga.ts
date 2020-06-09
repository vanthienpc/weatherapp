import IAction from 'models/IAction';
import * as WeatherAction from './WeatherAction';
import * as WeatherEffect from './WeatherEffect';
import * as ActionUtility from 'utilities/ActionUtility';

export function* fetchWeather(action: IAction<any>): Generator {
  return yield ActionUtility.createSagaEffect(
    WeatherAction.fetchWeatherFinished,
    WeatherEffect.fetchWeather,
    action.payload,
  );
}
