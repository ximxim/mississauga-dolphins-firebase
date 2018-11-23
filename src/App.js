/* @flow */
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider } from 'styled-components';
import {
  faTachometerAlt,
  faNewspaper,
  faHeadset,
  faUsers,
  faLifeRing,
  faCogs,
  faBell,
  faInfo,
  faUser,
  faAlignJustify,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';

import withSetup from './js/redux/setup';
import games from './js/routes/games';
import game from './js/routes/game';
import theme from './js/utils/theme';

type Props = {
    location: {
        pathname: string,
    },
}

library.add(
  faTachometerAlt,
  faNewspaper,
  faHeadset,
  faUsers,
  faLifeRing,
  faCogs,
  faBell,
  faInfo,
  faUser,
  faAlignJustify,
  faWindowClose,
);
class App extends Component<Props, *> {
  render() {
    let component = null;
    if (this.props.location.pathname === '/') {
      return <Redirect to="/games" />;
    }
    component = (
        <div>
            <React.Fragment>
                <Route path="/games" component={games} />
                <Route path="/game/:id" component={game} />
            </React.Fragment>
            <ToastContainer />
        </div>
    );

    return (
        <ThemeProvider theme={theme}>
            {component}
        </ThemeProvider>
    );
  }
}

export default withSetup(App);
