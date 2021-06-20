import { createStore, applyMiddleware, compose, Middleware, Store, StoreEnhancer } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { createBrowserHistory, History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import StoreModel from 'models/StoreModel';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

export const history: History = createBrowserHistory();

export const initialState: StoreModel = {
  error: {},
  request: {},
  weather: {},
};

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware, routerMiddleware(history)].filter(Boolean);
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers: StoreEnhancer =
  process.env.NODE_ENV === 'production' ? compose(...enhancers) : composeWithDevTools(...enhancers);

const store: Store<StoreModel> = createStore(rootReducer(history), initialState, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
