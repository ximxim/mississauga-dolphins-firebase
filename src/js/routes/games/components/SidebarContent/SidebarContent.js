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
    activeGameEvents: () => void,
    upcomingGameEvents: () => void,
    allGameEvents: () => void,
    pastGameEvents: () => void,
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
      filter: 'Active',
      search: '',
      sort: {
        ascending: true,
        option: 'start_time',
      },
    }

    props: Props;

    componentDidMount() {
      const activeGames = this.props.activeGameEvents();
      const upcomingGames = this.props.upcomingGameEvents();
      const pastGames = this.props.pastGameEvents();

      if (activeGames.length > 0) {
        this.setState({ events: activeGames });
      } else if (upcomingGames.length > 0) {
        this.setState({ events: upcomingGames });
      } else {
        this.setState({ events: pastGames });
      }
    }

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
            onChange={this.handleSearchChange}
            placeholder="Search Games..."
          />
      </div>
  )

  renderFilter = () => (
      <div className="border-bottom bg-white">
          <Dropdown
            label="Filter"
            onChange={this.handleFilterChange}
            options={[
              { value: 'Active' },
              { value: 'Upcoming' },
              { value: 'Past' },
              { value: 'All' },
            ]}
          />
      </div>

  );

  renderSort = () => (
      <div className="pt-2 text-center">
          <SortControl
            onChange={this.handleSortChange}
            options={[
              { key: 'title', value: 'Title', type: 'string' },
              { key: 'description', value: 'Description', type: 'string' },
              { key: 'start_time', value: 'Start time', type: 'datetime' },
            ]}
          />
      </div>
  );

  renderGameCards = () => (
      <ul className="list-unstyled pt-2">
          {_.map(this.state.events, event => <GameCard event={event} key={event.id} />)}
      </ul>
  );

  handleFilterChange = ({ selectedValue }) => this.setState(
    { filter: selectedValue.toLowerCase() },
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


  getGames = () => {
    const { filter, sort, search } = this.state;
    let gameEvents = [];

    // FILTER
    if (filter === 'active') {
      gameEvents = this.props.activeGameEvents();
    } else if (filter === 'upcoming') {
      gameEvents = this.props.upcomingGameEvents();
    } else if (filter === 'past') {
      gameEvents = this.props.pastGameEvents();
    } else {
      gameEvents = this.props.allGameEvents();
    }
    // SORT
    gameEvents = _.sortBy(gameEvents, [sort.option]);
    gameEvents = sort.ascending ? gameEvents : gameEvents.reverse();

    // SEARCH
    console.log(search);
    gameEvents = _.filter(gameEvents, event => event.title.toLowerCase().includes(search.toLowerCase()));

    this.setState({ events: gameEvents });
  }
}

const mapStateToProps = state => ({
  scores: state.scores,
  events: state.events,
  activeGameEvents: () => getActiveGameEvents(state),
  upcomingGameEvents: () => getUpcomingGameEvents(state),
  pastGameEvents: () => getPastGameEvents(state),
  allGameEvents: () => getAllGameEvents(state),
});

export default connect(mapStateToProps)(SidebarContent);
