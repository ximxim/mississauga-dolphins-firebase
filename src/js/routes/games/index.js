import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// UTILS
import requiresAuth from '../../utils/requiresAuth';

// UI COMPONENTS
import SidebarContent from './components/SidebarContent';
import SubNav from '../../components/SubNav';
import Game from './routes/game';
import GamesMenu from './routes/gamesMenu';

type Props = {
	history: Array<Object>,
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
                        <Route path={`${this.props.match.path}/menu`} component={GamesMenu} />
                        <Route path={`${this.props.match.path}/:id`} component={Game} />
                    </SubNav>
                </div>
            </div>
        );
    }

	renderSidebarContent = () => <SidebarContent {...this.props} />;
}

const mapStateToProps = (state) => {
    const { uid: user } = state.authUser;
    return {
        user,
    };
};

export default connect(mapStateToProps)(requiresAuth(Games));
