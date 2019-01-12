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
    faFileUpload,
    faListOl,
} from '@fortawesome/free-solid-svg-icons';

import withSetup from './js/redux/setup';
import games from './js/routes/games';
import players from './js/routes/players';
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
    faFileUpload,
    faListOl,
);
class App extends Component<Props, *> {
    render() {
        let component = null;
        if (this.props.location.pathname === '/') {
            return <Redirect to="/games/menu" />;
        }
        component = (
            <div>
                <React.Fragment>
                    <Route path="/games" component={games} />
                    <Route path="/players" component={players} />
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
