import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import * as HookUtility from 'utilities/HookUtility';
import SearchBox from '.';

const setup = (initialState?: boolean) => {
  let store: any;

  const sagaMiddleware = createSagaMiddleware();

  store = configureStore([sagaMiddleware])(initialState);

  jest.spyOn(HookUtility, 'useSelector').mockImplementation(() => store.getState());

  jest.spyOn(HookUtility, 'useDispatch').mockImplementation(() => store.dispatch);

  //@ts-ignore
  const wrapper = shallow(<SearchBox store={store} />);

  return { wrapper, store };
};

it('render should match the snapshot', () => {
  const initialState = false;
  const { wrapper } = setup(initialState);
  expect(toJson(wrapper)).toMatchSnapshot();
});
