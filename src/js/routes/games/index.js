import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import _ from 'lodash';

// UTILS
import requiresAuth from '../../utils/requiresAuth';

// REDUX
import {
  createGame,
  updateGame,
  finishGame,
  deleteGame,
} from '../../redux/modules/Scores';
import { getActiveGames, getScoresByGameId } from '../../redux/selectors';

// UI COMPONENTS
import SidebarContent from './components/SidebarContent';
import SubNav from '../../components/SubNav';

// STYLES
// import { GameCard } from './games.styled';

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

	renderActiveGames = () => {
	  const activeGames = this.getActiveGameEvents();
	  const games = _.filter(activeGames, event => event.game);
	  const { otherActiveGamesVisible } = this.state;

	  return this.renderGames({
	    games,
	    collapse: otherActiveGamesVisible,
	    title: 'Active Games',
	    toggle: this.toggleOtherActiveGamesCollapse,
	  });
	};

	renderUpcomingGames = () => {
	  const upcomingEvents = this.getUpcomingEvents();
	  const games = _.filter(upcomingEvents, event => event.game);
	  const { otherUpcomingGamesVisible } = this.state;

	  return this.renderGames({
	    games,
	    collapse: otherUpcomingGamesVisible,
	    title: 'Upcoming Games',
	    toggle: this.toggleOtherUpcomingGamesCollapse,
	  });
	};

	renderPastGames = () => {
	  const pastEvents = this.getPastEvents();
	  const games = _.filter(pastEvents, event => event.game);
	  const { otherPastGamesVisible } = this.state;

	  return this.renderGames({
	    games,
	    collapse: otherPastGamesVisible,
	    title: 'Past Games',
	    toggle: this.toggleOtherPastGamesCollapse,
	  });
	};
}

const mapStateToProps = (state) => {
  const { uid: user } = state.authUser;
  return {
    user,
    scores: state.scores,
    events: state.events,
    getActiveGames: () => getActiveGames(state),
    getScoresByGameId: id => getScoresByGameId(state, id),
  };
};

const mapDispatchToProps = {
  createGame,
  updateGame,
  finishGame,
  deleteGame,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(requiresAuth(Games));
