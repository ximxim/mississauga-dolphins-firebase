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
    faSortAlphaDown,
    faSortAlphaUp,
    faAlignLeft,
    faAlignRight,
    faTrashAlt,
    faPencilAlt,
    faPlayCircle,
    faStopCircle,
    faUserPlus,
    faRss,
} from '@fortawesome/free-solid-svg-icons';

import withSetup from './js/redux/setup';
import games from './js/routes/games';
import theme, { GlobalStyle } from './js/utils/theme';

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
    faSortAlphaDown,
    faSortAlphaUp,
    faAlignLeft,
    faAlignRight,
    faTrashAlt,
    faPencilAlt,
    faPlayCircle,
    faStopCircle,
    faUserPlus,
    faRss,
);
class App extends Component<Props, *> {
    render() {
        let component = null;
        if (this.props.location.pathname === '/') {
            return <Redirect to="/games/0" />;
        } else if (this.props.location.pathname === '/games') {
            return <Redirect to="/games/0" />;
        }
        component = (
            <div>
                <React.Fragment>
                    <Route path="/games" component={games} />
                </React.Fragment>
                <ToastContainer />
                <GlobalStyle />
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
