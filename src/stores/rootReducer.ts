import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import StoreModel from 'models/StoreModel';
import ErrorReducer from './error/ErrorReducer';
import RequestReducer from './request/RequestReducer';
import WeatherReducer from './weather/WeatherReducer';

const rootReducer = (history: History): Reducer<StoreModel> =>
  combineReducers({
    error: ErrorReducer,
    router: connectRouter(history) as any,
    request: RequestReducer,
    weather: WeatherReducer,
  } as ReducersMapObject<StoreModel>);

export default rootReducer;
