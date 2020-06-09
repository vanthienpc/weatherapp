import { RouterState } from 'connected-react-router';
import IErrorState from 'stores/error/models/IErrorState';
import IWeatherState from 'stores/weather/models/IWeatherState';
import IRequestState from 'stores/request/models/IRequestState';

export default interface IStore {
  readonly error: IErrorState;
  readonly request: IRequestState;
  readonly router: RouterState;
  readonly weather: IWeatherState;
}
