import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import { Provider } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootReducer from 'stores/rootReducer';
import { initialState } from 'stores/rootStore';
import StoreModel from 'models/StoreModel';
import App from './App';

type RenderWithRedux = RenderResult & {
  store: Store<StoreModel>;
  history: History;
};

function renderWithRedux(component: JSX.Element, state: StoreModel): RenderWithRedux {
  const history: History = createMemoryHistory({ initialEntries: ['/'] });
  const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
  const store: Store<StoreModel> = createStore(
    rootReducer(history),
    { ...initialState, ...state },
    applyMiddleware(sagaMiddleware),
  );
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>{component}</Switch>
        </Router>
      </Provider>,
    ),
    store,
    history,
  };
}

test('renders without crashing', async () => {
  const { container } = renderWithRedux(<App />, initialState);
  expect(container).toBeDefined();
});
