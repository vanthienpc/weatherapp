import { AxiosResponse } from 'axios';
import environment from 'environment';
import HttpUtility from 'utilities/HttpUtility';
import ErrorResponseModel from 'models/ErrorResponseModel';
import WeatherState from './models/WeatherState';

export const fetchWeather = async (payload: string): Promise<WeatherState | ErrorResponseModel> => {
  const endpoint = `${environment.api.forecast}?q=${payload}&units=metric`;
  const headers = {
    'x-rapidapi-host': process.env.REACT_APP_API_HOST,
    'x-rapidapi-key': process.env.REACT_APP_API_KEY,
  };
  const response: AxiosResponse | ErrorResponseModel = await HttpUtility.get(endpoint, undefined, {
    headers,
  });

  if (response instanceof ErrorResponseModel) {
    return response;
  }

  return response.data;
};
