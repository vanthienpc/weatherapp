import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import * as HookUtility from 'utilities/HookUtility';
import ErrorBox from '.';

const setup = (initialState?: string) => {
  let store: any;

  const sagaMiddleware = createSagaMiddleware();

  store = configureStore([sagaMiddleware])(initialState);

  jest.spyOn(HookUtility, 'useSelector').mockImplementation(() => store.getState());

  //@ts-ignore
  const wrapper = shallow(<ErrorBox store={store} />);

  return { wrapper, store };
};

it('render should match the snapshot', () => {
  const initialState = 'city not found';
  const { wrapper } = setup(initialState);
  expect(toJson(wrapper)).toMatchSnapshot();
});
