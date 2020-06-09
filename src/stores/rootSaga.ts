import { takeEvery } from 'redux-saga/effects';
import * as WeatherType from './weather/WeatherType';
import * as WeatherSaga from './weather/WeatherSaga';

function* watchAll() {
  yield takeEvery(WeatherType.FETCH_WEATHER_REQUEST, WeatherSaga.fetchWeather);
}

export default watchAll;
