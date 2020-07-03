import IStore from 'models/IStore';
import { Action } from 'redux';
import IAction from 'models/IAction';
import { ofType } from 'redux-observable';
import { of, Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as WeatherType from './WeatherType';
import * as WeatherAction from './WeatherAction';
import ErrorResponseModel from 'models/ErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';

const fetchWeatherEpic = (
  action$: Observable<Action<any>>,
  state$: IStore,
  { fetchWeatherEffect }: any,
) =>
  action$.pipe(
    ofType(WeatherType.FETCH_WEATHER_REQUEST),
    switchMap(({ payload }: IAction<any>) => fetchWeatherEffect(payload)),
    map((response: any) =>
      ActionUtility.createEpicResponse(WeatherAction.fetchWeatherFinished, response),
    ),
    catchError((error: ErrorResponseModel) =>
      of(ActionUtility.createEpicResponse(WeatherAction.fetchWeatherFinished, error)),
    ),
  );

export default [fetchWeatherEpic];
