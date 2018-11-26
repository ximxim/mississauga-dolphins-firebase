import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// UTILS
import requiresAuth from '../../utils/requiresAuth';

// UI COMPONENTS
import SidebarContent from './components/SidebarContent';
import SubNav from '../../components/SubNav';

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
	state: State;

	props: Props;

	render() {
	  return (
    <div className="row no-gutters">
        <div className="col">
            <SubNav renderSidebarContent={this.renderSidebarContent}>
                <Route path={`${this.props.match.path}/:id`} component={() => <p>game</p>} />
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
