import { RouterState } from 'connected-react-router';
import ErrorState from 'stores/error/models/ErrorState';
import WeatherState from 'stores/weather/models/WeatherState';
import RequestState from 'stores/request/models/RequestState';

export default interface StoreModel {
  readonly error: ErrorState;
  readonly request: RequestState;
  readonly router?: RouterState;
  readonly weather: WeatherState;
}
