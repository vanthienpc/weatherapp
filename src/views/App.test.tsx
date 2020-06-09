import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootReducer from 'stores/rootReducer';
import { initialState } from 'stores/rootStore';
import IStore from 'models/IStore';
import App from './App';

const renderWithRedux = (component: JSX.Element, state: Partial<IStore> = {}) => {
  const history: MemoryHistory = createMemoryHistory({ initialEntries: ['/'] });
  const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
  const store: Store<IStore> = createStore(
    rootReducer(history),
    { ...(initialState as any), ...state },
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
};

test('renders without crashing', async () => {
  const { container } = renderWithRedux(<App />);
  expect(container).toBeDefined();
});
