/* @flow */
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTachometerAlt, faNewspaper, faHeadset, faUsers, faLifeRing, faCogs,
} from '@fortawesome/free-solid-svg-icons';

import withSetup from './js/redux/setup';
import { MainNav } from './js/components';

import games from './js/routes/games';
import game from './js/routes/game';

type Props = {
    location: {
        pathname: string,
    },
}

library.add(faTachometerAlt, faNewspaper, faHeadset, faUsers, faLifeRing, faCogs);

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
        <MainNav>
            {component}
        </MainNav>
    );
  }
}

export default withSetup(App);
