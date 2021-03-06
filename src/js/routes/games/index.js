import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// UTILS
import requiresAuth from '../../utils/requiresAuth';

// UI COMPONENTS
import SidebarContent from './components/SidebarContent';
import SubNav from '../../components/SubNav';
import Game from './routes/game';

type Props = {
	events: {
		items: Array<Object>,
	},
	scores: {
		games: Array<Object>,
	},
}

type State = {}

class Games extends Component<Props, State> {
    render() {
        return (
            <div className="row no-gutters">
                <div className="col">
                    <SubNav renderSidebarContent={this.renderSidebarContent}>
                        <Route path={`${this.props.match.path}/:id`} component={Game} />
                    </SubNav>
                </div>
            </div>
        );
    }

	renderSidebarContent = () => <SidebarContent {...this.props} />;
}

export default requiresAuth(Games);
