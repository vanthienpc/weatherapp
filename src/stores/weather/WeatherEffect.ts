import { Observable, from } from 'rxjs';
import environment from 'environment';
import HttpUtility from 'utilities/HttpUtility';
import ErrorResponseModel from 'models/ErrorResponseModel';
import IWeatherState from './models/IWeatherState';
import { AxiosResponse } from 'axios';

export const fetchWeatherEffect = (
  payload: string,
): Observable<AxiosResponse<IWeatherState> | ErrorResponseModel> => {
  const endpoint: string = `${environment.api.forecast}?q=${payload}&units=metric`;
  const headers = {
    'x-rapidapi-host': process.env.REACT_APP_API_HOST,
    'x-rapidapi-key': process.env.REACT_APP_API_KEY,
  };

  return from(HttpUtility.get(endpoint, undefined, { headers }));
};
