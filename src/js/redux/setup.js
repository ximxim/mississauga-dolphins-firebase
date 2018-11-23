import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createHashHistory';

import configureStore, { getStore } from './store';
import { requestMeta } from './modules/Meta';

const history = createHistory();

export default function withSetup(App) {
  return class Setup extends Component {
    componentDidMount() {
      const store = getStore();
      if (store) {
        store.dispatch(requestMeta());
      }
    }

    render() {
      return (
          <Provider store={configureStore()}>
              <Router history={history}>
                  <Switch>
                      <Route path="/" component={App} />
                  </Switch>
              </Router>
          </Provider>
      );
    }
  };
}
