import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// UI COMPONENTS
import {
  SearchBar, DateTime, SortControl, Dropdown,
} from '../../../../components/ui';

// REDUX
import { getActiveGames, getScoresByGameId, getActiveGameEvents } from '../../../../redux/selectors';

// STYLES
import { GameCard } from './SidebarContent.styled';

type Props = {
    activeGames: () => void,
    activeGameEvents: () => void,
};

type State = {}

class SidebarContent extends React.Component<Props, State> {
    state: State = {}

    props: Props;

    render() {
      return (
          <div>
              {this.renderSearchBar()}
              {this.renderFilter()}
              {this.renderSort()}
              {this.renderGameCards()}
          </div>
      );
    }

  renderSearchBar = () => <SearchBar />

  renderFilter = () => (
      <Dropdown
        label="Filter"
        options={[
          { value: 'Inactive' },
          { value: 'Active' },
        ]}
      />
  );

  renderSort = () => (
      <div className="pt-2 text-center">
          <SortControl />
      </div>
  );

  renderGameCards = () => {
    const activeGames = this.props.activeGameEvents();
    return _.map(activeGames, game => this.renderGameCard(game));
  };

  renderGameCard = (game) => {
    if (game) {
      return (
          <GameCard key={game.id}>
              <ul className="list-unstyled">
                  <li>
                      <h6 className="text-left">
                          <a href="#">
                              {game.title}
                              {console.log(game)}
                          </a>
                      </h6>
                  </li>
                  <li>
                      <h6>Start date</h6>
                      <DateTime datetime={game.start_time} />
                  </li>
              </ul>
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
  scoresById: id => getScoresByGameId(state, id),
});

export default connect(mapStateToProps)(SidebarContent);
