import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import IStore from 'models/IStore';
import ErrorReducer from './error/ErrorReducer';
import RequestReducer from './request/RequestReducer';
import WeatherReducer from './weather/WeatherReducer';

const rootReducer = (history: History): Reducer<IStore> =>
  combineReducers({
    error: ErrorReducer,
    router: connectRouter(history) as any,
    request: RequestReducer,
    weather: WeatherReducer,
  } as ReducersMapObject<IStore>);

export default rootReducer;
