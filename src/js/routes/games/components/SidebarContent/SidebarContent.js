import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// UI COMPONENTS
import {
    SearchBar,
    SortControl,
    Dropdown,
    GameCard,
} from '../../../../components/ui';

// REDUX
import {
    getActiveGameEvents,
    getPastGameEvents,
    getUpcomingGameEvents,
    getAllGameEvents,
    getScoresByGameId,
} from '../../../../redux/selectors';
import { location } from '../../../../types/router';

type Props = {
  loadingScores: Boolean,
  loadingEvents: Boolean,
  activeGameEvents: {},
  upcomingGameEvents: {},
  pastGameEvents: {},
  allGameEvents: {},
  scoresByGameId: () => {},
  location: location,
  location: { pathname: string, },
};

type State = {
    filter: string,
    search: string,
    sort: {
        ascending: Boolean,
        option: string,
    }
}

class SidebarContent extends React.Component<Props, State> {
    state: State = {
        filter: 'all',
        search: '',
        sort: {
            ascending: false,
            option: 'scored',
        },
    }

    props: Props;

    render() {
        const { loadingScores, loadingEvents } = this.props;

        return (
            <div>
                <div className="sticky-top shadow">
                    <Link
                        to="/games/menu"
                        className="button d-block bg-primary text-white text-center p-1 border-top-2 border-dark heading"
                    >
                        Games Menu
                    </Link>
                    {this.renderSearchBar()}
                    {this.renderFilter()}
                </div>
                {this.renderSort()}
                {loadingEvents || loadingScores
                    ? <p className="text-center">loading...</p>
                    : this.renderGameCards(this.getGames())}
            </div>
        );
    }

  renderSearchBar = () => (
      <div className="border-bottom bg-white">
          <SearchBar
              onChange={this.handleSearchChange}
              placeholder="Search Games..."
              value={this.state.search}
          />
      </div>
  )

  renderFilter = () => (
      <div className="border-bottom bg-white">
          <Dropdown
              label="Filter"
              value={this.state.filter}
              onChange={this.handleFilterChange}
              options={[
                  { value: 'Active', key: 'active' },
                  { value: 'Upcoming', key: 'upcoming' },
                  { value: 'Past', key: 'past' },
                  { value: 'All', key: 'all' },
              ]}
          />
      </div>

  );

  renderSort = () => (
      <div className="pt-2 text-center">
          <SortControl
              onChange={this.handleSortChange}
              defaultValue={this.state.sort}
              options={[
                  { key: 'scored', value: 'Scored' },
                  { key: 'title', value: 'Title' },
                  { key: 'description', value: 'Description' },
                  { key: 'start_time', value: 'Start time' },
              ]}
          />
      </div>
  );

  renderGameCards = (gameEvents) => {
      const { filter } = this.state;
      if (gameEvents.length > 0) {
          return (
              <ul className="list-unstyled pt-2">
                  {_.map(gameEvents, (event) => {
                      if (!event) return null;
                      const { pathname } = this.props.location;
                      const split = pathname.split('/');
                      const selected = split.length > 0
                          ? split[2] === event.id
                          : false;
                      return (
                          <GameCard
                              id={event.id}
                              event={event}
                              key={event.id}
                              selected={selected}
                          />
                      );
                  })}
              </ul>
          );
      }
      return <p className="text-center pt-2">{`No ${filter} games found`}</p>;
  }


  handleFilterChange = ({ selectedKey }) => this.setState(
      { filter: selectedKey },
  );

  handleSortChange = ({ option, ascending }) => this.setState(
      { sort: { option, ascending } },
  );

  handleSearchChange = search => this.setState({ search });

  getGames = () => {
      const { filter, sort, search } = this.state;
      const {
          activeGameEvents,
          upcomingGameEvents,
          pastGameEvents,
          allGameEvents,
      } = this.props;
      let gameEvents = [];

      // FILTER
      if (filter === 'active') {
          gameEvents = activeGameEvents;
      }
      if (filter === 'upcoming') {
          gameEvents = upcomingGameEvents;
      }
      if (filter === 'past') {
          gameEvents = pastGameEvents;
      }
      if (filter === 'all') {
          gameEvents = allGameEvents;
      }

      gameEvents = gameEvents.map(game => ({
          ...game,
          scored: !!game.game_id,
      }));

      gameEvents = _.sortBy(gameEvents, [sort.option]);
      gameEvents = sort.ascending ? gameEvents : gameEvents.reverse();

      // SEARCH
      if (search) {
          gameEvents = _.filter(
              gameEvents,
              event => event.title.toLowerCase().includes(search.toLowerCase())
              || event.id.toLowerCase().includes(search.toLowerCase()),
          );
      }

      gameEvents = _.map(gameEvents, (game) => {
          if (!game.game_id) return game;

          const score = this.props.scoresByGameId(game.id);
          return {
              ...game,
              score,
          };
      });

      return gameEvents;
  }
}

const mapStateToProps = state => ({
    loadingScores: state.scores.loading,
    loadingEvents: state.events.loading,
    activeGameEvents: getActiveGameEvents(state),
    upcomingGameEvents: getUpcomingGameEvents(state),
    pastGameEvents: getPastGameEvents(state),
    allGameEvents: getAllGameEvents(state),
    scoresByGameId: id => getScoresByGameId(state, id),
});

export default connect(mapStateToProps)(SidebarContent);
