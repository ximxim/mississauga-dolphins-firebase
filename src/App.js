/* @flow */
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import withSetup from './js/redux/setup';

import games from './js/routes/games';
import game from './js/routes/game';

type Props = {
    location: {
        pathname: string,
    },
}

class App extends Component<Props, *> {
  render() {
    if (this.props.location.pathname === '/') {
      return (<Redirect to="/games" />);
    }
    return (
        <div>
            <React.Fragment>
                <Route path="/games" component={games} />
                <Route path="/game/:id" component={game} />
            </React.Fragment>
            <ToastContainer />
        </div>
    );
  }
}

export default withSetup(App);
