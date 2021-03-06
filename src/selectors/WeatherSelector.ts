import { createSelector } from 'reselect';
import { format } from 'date-fns';
import groupBy from 'lodash/groupBy';
import StoreModel from 'models/StoreModel';
import { WeatherModel } from 'stores/weather/models/WeatherModel';

const urlIcon = (type: string) => `https://openweathermap.org/img/wn/${type}@2x.png`;

const getWeather = (state: StoreModel): any => state.weather;

export const selectWeatherListWithFiveDays = createSelector(getWeather, ({ list }):
  | WeatherModel[]
  | undefined => {
  if (list) {
    const groupWithDate = groupBy(list, (item: any) => {
      return format(new Date(item.dt_txt), 'dd MMM yyyy');
    });

    const listWithLatestTime = Object.values(groupWithDate).map((item: any) => {
      return item[item.length - 1];
    });

    return listWithLatestTime.map((item: any) => ({
      id: item.dt,
      dayOfWeek: format(new Date(item.dt_txt), 'EEEE'),
      icon: urlIcon(item.weather[0].icon),
      state: item.weather[0].main,
      temperCur: `${item.main.temp} °C`,
      temperMin: `${item.main.temp_min} °C`,
      temperMax: `${item.main.temp_max} °C`,
    }));
  }

  return undefined;
});
