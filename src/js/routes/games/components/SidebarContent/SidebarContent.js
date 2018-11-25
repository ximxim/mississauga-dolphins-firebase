import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// UI COMPONENTS
import {
  SearchBar, DateTime, SortControl, Dropdown,
} from '../../../../components/ui';

// REDUX
import {
  getActiveGames,
  getScoresByGameId,
  getActiveGameEvents,
  getPastGameEvents,
  getUpcomingGameEvents,
} from '../../../../redux/selectors';

// STYLES
import { GameCard } from './SidebarContent.styled';

type Props = {
    activeGames: () => void,
    activeGameEvents: () => void,
    upcomingGameEvents: () => void,
    pastGameEvents: () => void,
};

type State = {}

class SidebarContent extends React.Component<Props, State> {
    state: State = {}

    props: Props;

    render() {
      return (
          <div>
              <div className="sticky-top shadow">
                  {this.renderSearchBar()}
                  {this.renderFilter()}
              </div>
              {this.renderSort()}
              {this.renderGameCards()}
          </div>
      );
    }

  renderSearchBar = () => (
      <div className="border-bottom">
          <SearchBar
            placeholder="Search Games..."
          />
      </div>
  )

  renderFilter = () => (
      <div className="border-bottom bg-white">
          <Dropdown
            label="Filter"
            options={[
              { value: 'Inactive' },
              { value: 'Active' },
            ]}
          />
      </div>

  );

  renderSort = () => (
      <div className="pt-2 text-center">
          <SortControl />
      </div>
  );

  renderGameCards = () => {
    const pastGames = this.props.pastGameEvents();
    return (
        <ul className="list-unstyled pt-2">
            {_.map(pastGames, game => this.renderGameCard(game))}
        </ul>
    );
  };

  renderGameCard = (game) => {
    if (game) {
      return (
          <GameCard className="border-top px-1 py-2" key={game.id}>
              <div>
                  <h6 className="text-left mb-0">
                      <a href="#">
                          {game.title}
                      </a>
                  </h6>
              </div>
              <div>
                  <p className="d-inline heading mr-1 mb-0">Start date:</p>
                  <DateTime datetime={game.start_time} />
              </div>
          </GameCard>
      );
    }
    return null;
  };
}

const mapStateToProps = state => ({
  scores: state.scores,
  events: state.events,
  activeGames: () => getActiveGames(state),
  activeGameEvents: () => getActiveGameEvents(state),
  upcomingGameEvents: () => getUpcomingGameEvents(state),
  pastGameEvents: () => getPastGameEvents(state),
  scoresById: id => getScoresByGameId(state, id),
});

export default connect(mapStateToProps)(SidebarContent);
