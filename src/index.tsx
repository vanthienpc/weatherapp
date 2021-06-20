import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import store from 'stores/rootStore';
import StoreModel from 'models/StoreModel';
import App from 'views/App';
import * as serviceWorker from './serviceWorker';

type Props = {
  store: Store<StoreModel>;
};

const Root: React.FC<Props> = ({ store }: Props) => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
