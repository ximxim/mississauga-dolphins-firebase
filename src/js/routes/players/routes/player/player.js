import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI COMPONENTS
import { SubNavbar } from '../../../../components';
import { getPlayerById, getPlayerGamesById } from '../../../../redux/selectors';
import PlayerDetails from './component/PlayerDetails';
import PlayerStatistics from './component/PlayerStatistics';
import PlayerGames from './component/PlayerGames';

// TYPES
import { EventsType } from '../../../../redux/modules/Events/types';
import { Player as PlayerType } from '../../../../redux/modules/Players/types';

type Props = {
    player: PlayerType,
    games: Array<EventsType>,
}

class Player extends Component<Props, *> {
    render() {
        const { player, games } = this.props;
        if (!player) return null;
        return (
            <div>
                <div className="row no-gutters sticky-top">
                    <div className="col">
                        <SubNavbar options={this.NavbarOptions()} />
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <PlayerDetails player={player} />
                    </div>
                    <div className="col-md-8">
                        <PlayerStatistics player={player} />
                    </div>
                    <div className="col-12">
                        <PlayerGames games={games} />
                    </div>
                </div>
            </div>
        );
    }

    NavbarOptions = () => ([
        {
            icon: 'edit',
            label: 'Edit Statistics',
            key: 'edit-statistics',
        },
        {
            icon: 'user-edit',
            label: 'Edit Player',
            key: 'edit-player',
        },

    ]);
}

const mapStateToProps = (state, ownProps) => ({
    player: getPlayerById(state, ownProps.match.params.id),
    games: getPlayerGamesById(state, ownProps.match.params.id),
});

export default connect(mapStateToProps)(Player);
