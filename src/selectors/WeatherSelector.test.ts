import { selectWeatherListWithFiveDays } from './WeatherSelector';

let store: any;

beforeEach(() => {
  store = {
    weather: {},
  };
});

describe('selectWeatherListWithFiveDays', () => {
  it('should return weather list', () => {
    store = {
      weather: {
        ...store.weather,
        list: [
          {
            dt: 1591714800,
            dt_txt: '2020-06-09 15:00:00',
            weather: [
              {
                id: 1,
                main: 'Rain',
                icon: '10n',
              },
            ],
            main: {
              temp: 29,
              temp_min: 29,
              temp_max: 30,
            },
          },
        ],
      },
    };
    const received = selectWeatherListWithFiveDays(store);

    const expected = [
      {
        id: 1591714800,
        dayOfWeek: 'Tuesday',
        icon: 'https://openweathermap.org/img/wn/10n@2x.png',
        state: 'Rain',
        temperCur: '29 °C',
        temperMin: '29 °C',
        temperMax: '30 °C',
      },
    ];

    expect(received).toEqual(expected);
  });

  it('should return undefined', () => {
    const received = selectWeatherListWithFiveDays(store);
    expect(received).toEqual(undefined);
  });
});
