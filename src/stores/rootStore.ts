import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
  Store,
  StoreEnhancer,
  Action,
} from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { createBrowserHistory, History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import IStore from 'models/IStore';
import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import rootDependencies from './rootDependencies';

export const history: History = createBrowserHistory();

export const initialState: Partial<IStore> = {};

const epicMiddleware: EpicMiddleware<Action<any>, Action<any>, IStore> = createEpicMiddleware(
  rootDependencies,
);

const middlewares: Middleware[] = [epicMiddleware, routerMiddleware(history)].filter(Boolean);
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers: StoreEnhancer =
  process.env.NODE_ENV === 'production' ? compose(...enhancers) : composeWithDevTools(...enhancers);

const store: Store<IStore> = createStore(
  rootReducer(history),
  initialState as any,
  composedEnhancers,
);

epicMiddleware.run(rootEpic as any);

export default store;
