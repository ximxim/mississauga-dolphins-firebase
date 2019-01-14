import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// UTILS
import requiresAuth from '../../utils/requiresAuth';

// UI COMPONENTS
import PlayerSidebarContent from './components/PlayerSidebarContent';
import SubNav from '../../components/SubNav';
import Player from './routes/player';

// TYPES
import { match } from '../../types/router';

type Props = {
    match: match,
	events: {
		items: Array<Object>,
	},
	scores: {
		games: Array<Object>,
	},
}

type State = {};

class Players extends Component<Props, State> {
    state = {};

    render() {
        return (
            <div className="row no-gutters">
                <div className="col">
                    <SubNav renderSidebarContent={this.renderSidebarContent}>
                        <Route path={`${this.props.match.path}/:id`} component={Player} />
                    </SubNav>
                </div>
            </div>
        );
    }

    renderSidebarContent = () => <PlayerSidebarContent {...this.props} />;
}

export default requiresAuth(Players);
