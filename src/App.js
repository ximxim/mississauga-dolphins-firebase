/* @flow */
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider } from 'styled-components';
import {
  faTachometerAlt, faNewspaper, faHeadset, faUsers, faLifeRing, faCogs, faBell, faInfo, faUser,
} from '@fortawesome/free-solid-svg-icons';

import withSetup from './js/redux/setup';
import { MainNav } from './js/components';
import games from './js/routes/games';
import game from './js/routes/game';
import theme from './js/utils/theme';

type Props = {
    location: {
        pathname: string,
    },
}

library.add(faTachometerAlt, faNewspaper, faHeadset, faUsers, faLifeRing, faCogs, faBell, faInfo, faUser);

class App extends Component<Props, *> {
  render() {
    console.log(library);
    let component = null;
    if (this.props.location.pathname === '/') {
      component = <Redirect to="/games" />;
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
            <MainNav>
                {component}
            </MainNav>
        </ThemeProvider>
    );
  }
}

export default withSetup(App);
