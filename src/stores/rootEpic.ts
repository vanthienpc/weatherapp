import { combineEpics } from 'redux-observable';
import WeatherEpic from './weather/WeatherEpic';

const epics = [...WeatherEpic];

export default combineEpics(...epics);
