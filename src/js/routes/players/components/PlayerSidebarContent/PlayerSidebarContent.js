import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// REDUX
import { getPlayerGamesById } from '../../../../redux/selectors';

// UI COMPONENTS
import {
    SearchBar,
    SortControl,
    Dropdown,
    PlayerCard,
} from '../../../../components/ui';

// TYPES
import { Players } from '../../../../redux/modules/Players/types';
import { location } from '../../../../types/router';

type Props = {
    location: location,
    players: Players,
    playerGames: () => void,
}

type State = {
    filter: string,
    search: string,
    sort: {
        ascending: Boolean,
        option: string,
    }
}

class PlayersSidebarContent extends Component<Props, State> {
    state: State = {
        filter: 'all',
        search: '',
        sort: {
            ascending: true,
            option: 'FIRST_NAME',
        },
    }

    render() {
        const { players: { loading } } = this.props;
        return (
            <div>
                <div className="sticky-top shadow">
                    <Link
                        to="/players/menu"
                        className="button d-block bg-primary text-white text-center p-1 border-top-2 border-dark heading"
                    >
                        Players Menu
                    </Link>
                    {this.renderSearchBar()}
                    {this.renderFilter()}
                </div>
                {this.renderSort()}
                {loading
                    ? <p className="text-center">loading...</p>
                    : this.renderPlayerCard(this.getPlayers())}
            </div>
        );
    }

    renderSearchBar = () => (
        <div className="border-bottom bg-white">
            <SearchBar
                onChange={this.handleSearchChange}
                placeholder="Search Players..."
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
                    { value: 'All', key: 'all' },
                    { value: 'Allrounders', key: 'allrounder' },
                    { value: 'Bowlers', key: 'bowler' },
                    { value: 'Lower Orders', key: 'lower_order' },
                    { value: 'Middle Orders', key: 'middle_order' },
                    { value: 'Openers', key: 'opener' },
                    { value: 'Wicket Keepers', key: 'wicket_keeper' },
                    { value: 'Deleted', key: 'deleted' },
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
                    { key: 'FIRST_NAME', value: 'First Name' },
                    { key: 'LAST_NAME', value: 'Last Name' },
                ]}
            />
        </div>
    );

    renderPlayerCard = (players) => {
        const { filter } = this.state;
        if (players.length > 0) {
            return (
                <ul className="list-unstyled pt-2">
                    {_.map(players, (player) => {
                        if (!player) return null;
                        const { pathname } = this.props.location;
                        const split = pathname.split('/');
                        const selected = split.length > 0
                            ? _.parseInt(split[2]) === player.id
                            : false;
                        return (
                            <PlayerCard
                                id={player.id}
                                player={player}
                                key={player.id}
                                selected={selected}
                            />
                        );
                    })}
                </ul>
            );
        }
        return <p className="text-center pt-2">{`No ${filter} found`}</p>;
    }

    handleFilterChange = ({ selectedKey }) => this.setState(
        { filter: selectedKey },
    );

    handleSortChange = ({ option, ascending }) => this.setState(
        { sort: { option, ascending } },
    );

    handleSearchChange = search => this.setState({ search });

    getPlayers = () => {
        const { filter, sort, search } = this.state;
        const { players: { items }, playerGames } = this.props;
        let players = [];

        // FILTER
        if (filter === 'all') {
            players = _.filter(items, player => !player.inactive);
        } else if (filter === 'deleted') {
            players = _.filter(items, player => player.inactive);
        } else {
            players = _.filter(items, player => _.snakeCase(player.ROLE) === filter);
        }

        players = _.sortBy(players, [sort.option]);
        players = sort.ascending ? players : players.reverse();

        // SEARCH
        if (search) {
            players = _.filter(
                players,
                player => player.FIRST_NAME.toLowerCase().includes(search.toLowerCase())
                || player.LAST_NAME.toLowerCase().includes(search.toLowerCase()),
            );
        }

        players = _.map(players, player => ({
            ...player,
            games: playerGames(player.id),
        }));

        return players;
    }
}

const mapStateToProps = state => ({
    players: state.players,
    playerGames: id => getPlayerGamesById(state, id),
});

export default connect(mapStateToProps)(PlayersSidebarContent);
