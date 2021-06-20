import React from 'react';
import { Store } from 'redux';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import * as HookUtility from 'utilities/HookUtility';
import WeatherState from 'stores/weather/models/WeatherState';
import WeatherBox from '.';

const setup = (initialState?: WeatherState[] | undefined) => {
  let useEffect: any;
  let store: Store;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f: any) => f());
  };

  const sagaMiddleware = createSagaMiddleware();

  store = configureStore([sagaMiddleware])(initialState);

  useEffect = jest.spyOn(React, 'useEffect');
  mockUseEffect();
  mockUseEffect();

  jest.spyOn(HookUtility, 'useSelector').mockImplementation(() => store.getState());

  const setWeather = jest.fn();

  jest
    .spyOn(React, 'useState')
    .mockImplementation(() => [initialState ? store.getState() : undefined, setWeather]);

  //@ts-ignore
  const wrapper = shallow(<WeatherBox store={store} />);

  return { wrapper };
};

it('render should match the snapshot', () => {
  const initialState: WeatherState[] = [
    {
      id: 1,
      dayOfWeek: 'Tuesday',
      icon: 'https://openweathermap.org/img/wn/10n@2x.png',
      state: 'Rain',
      temperCur: '29 °C',
      temperMin: `29 °C`,
      temperMax: `31 °C`,
    },
  ];
  const { wrapper } = setup(initialState);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('render should match null', () => {
  const { wrapper } = setup();
  expect(wrapper.html()).toBeNull();
});
