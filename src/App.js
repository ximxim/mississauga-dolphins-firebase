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
    faUserEdit,
    faEdit,
    faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

import 'react-table/react-table.css';
import withSetup from './js/redux/setup';
import newsfeed from './js/routes/newsfeed';
import games from './js/routes/games';
import players from './js/routes/players';
import sponsors from './js/routes/sponsors';
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
    faUserEdit,
    faEdit,
    faExclamationTriangle,
);

class App extends Component<Props, *> {
    render() {
        let component = null;
        if (this.props.location.pathname === '/') {
            return <Redirect to="/newsfeed" />;
        }
        component = (
            <div>
                <React.Fragment>
                    <Route path="/newsfeed" component={newsfeed} />
                    <Route path="/games" component={games} />
                    <Route path="/players" component={players} />
                    <Route path="/sponsors" component={sponsors} />
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
