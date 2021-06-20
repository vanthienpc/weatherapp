import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'stores/rootStore';
import { Switch, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));

const App: React.FC = () => (
  <ConnectedRouter history={history} noInitialPop>
    <React.Suspense fallback="loading...">
      <Switch>
        <Route exact={true} path="/" component={Home} />
      </Switch>
    </React.Suspense>
  </ConnectedRouter>
);

export default App;
