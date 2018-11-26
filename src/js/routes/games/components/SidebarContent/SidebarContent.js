import React from 'react';
import { connect } from 'react-redux';
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
} from '../../../../redux/selectors';
import { EventsType } from '../../../../redux/modules/Events/types';

// STYLES
// import { GameCard } from './SidebarContent.styled';

type Props = {
    scores: {
        loading: Boolean,
    },
    events: {
        loading: Boolean,
    },
};

type State = {
    events: Array<EventsType>,
    filter: string,
    search: string,
    sort: {
        ascending: Boolean,
        option: string,
    }
}

class SidebarContent extends React.Component<Props, State> {
    state: State = {
      events: [],
      filter: 'active',
      search: null,
      sort: {
        ascending: true,
        option: 'start_time',
      },
    }

    props: Props;

    componentWillReceiveProps(nextProps) {
      this.getGames(nextProps);
    }

    render() {
      const { scores, events } = this.props;
      if (scores.loading || events.loading) {
        return <p className="text-center">loading</p>;
      }
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
            onChange={this.handleSearchChange}
            placeholder="Search Games..."
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
            options={[
              { key: 'title', value: 'Title' },
              { key: 'description', value: 'Description' },
              { key: 'start_time', value: 'Start time' },
            ]}
          />
      </div>
  );

  renderGameCards = () => (
      <ul className="list-unstyled pt-2">
          {_.map(this.state.events, event => <GameCard event={event} key={event.id} />)}
      </ul>
  );

  handleFilterChange = ({ selectedKey }) => this.setState(
    { filter: selectedKey },
    this.getGames,
  );

  handleSortChange = ({ option, ascending }) => this.setState(
    { sort: { option, ascending } },
    this.getGames,
  );

  handleSearchChange = ({ value }) => this.setState(
    { search: value },
    this.getGames,
  );

  getGames = (nextProps) => {
    const { filter, sort, search } = this.state;
    const props = nextProps || this.props;
    const {
      activeGameEvents,
      upcomingGameEvents,
      pastGameEvents,
      allGameEvents,
    } = props;
    let gameEvents = [];

    // FILTER
    if (filter === 'active' && activeGameEvents.length > 0) {
      this.setState({ filter: 'active' });
      gameEvents = activeGameEvents;
    }
    if (filter === 'upcoming' && upcomingGameEvents.length > 0) {
      this.setState({ filter: 'upcoming' });
      gameEvents = upcomingGameEvents;
    }
    if (filter === 'past' && pastGameEvents.length > 0) {
      this.setState({ filter: 'past' });
      gameEvents = pastGameEvents;
    }
    if (filter === 'all' && allGameEvents.length > 0) {
      this.setState({ filter: 'all' });
      gameEvents = allGameEvents;
    }
    // SORT
    gameEvents = _.sortBy(gameEvents, [sort.option]);
    gameEvents = sort.ascending ? gameEvents : gameEvents.reverse();

    // SEARCH
    if (search) {
      gameEvents = _.filter(
        gameEvents,
        event => event.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    this.setState({ events: gameEvents });
  }
}

const mapStateToProps = state => ({
  scores: state.scores,
  events: state.events,
  activeGameEvents: getActiveGameEvents(state),
  upcomingGameEvents: getUpcomingGameEvents(state),
  pastGameEvents: getPastGameEvents(state),
  allGameEvents: getAllGameEvents(state),
});

export default connect(mapStateToProps)(SidebarContent);
