import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// REDUX
import { editPlayer, deletePlayer } from '../../../../redux/modules/Players';

// UI COMPONENTS
import { SubNavbar } from '../../../../components';
import { Modal } from '../../../../components/ui';
import { getPlayerById, getPlayerGamesById } from '../../../../redux/selectors';
import PlayerDetails from './component/PlayerDetails';
import PlayerStatistics from './component/PlayerStatistics';
import PlayerGames from './component/PlayerGames';
import { PlayerForm } from '../../../../components/forms';

// TYPES
import { EventsType } from '../../../../redux/modules/Events/types';
import { Player as PlayerType } from '../../../../redux/modules/Players/types';

type Props = {
    loadingPlayers: Boolean,
    player: PlayerType,
    games: Array<EventsType>,
    editPlayer: () => void,
    deletePlayer: () => void,
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
                    {this.renderAlert(player)}
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
                <Modal
                    header="Edit Player"
                    body={this.renderEditPlayerBody}
                    footer={() => this.renderEditPlayerModalFooter(player)}
                    ref={(o) => { this.editPlayerModal = o; }}
                />
            </div>
        );
    }

    renderAlert = (player) => {
        if (!player.inactive) return null;
        return (
            <div className="col-12 p-2">
                <Alert color="warning">
                    <FontAwesomeIcon icon="exclamation-triangle" />
                    <span className="ml-1">
                        This player is no longer active with the team.
                    </span>
                </Alert>
            </div>
        );
    }

    renderEditPlayerBody = () => (
        <PlayerForm
            player={this.props.player}
            action={this.props.editPlayer}
        />
    )

    renderEditPlayerModalFooter = (player) => {
        const { loadingPlayers } = this.props;
        return (
            <div className="d-flex justify-content-between w-100">
                <div>
                    <Button
                        outline
                        color="danger"
                        onClick={() => this.props.deletePlayer(player)}
                    >
                        Delete
                    </Button>
                </div>
                <div>
                    <Button
                        outline
                        color="secondary"
                        className="mr-1"
                        onClick={() => ((this.editPlayerModal) && this.editPlayerModal.toggle())}
                    >
                        Cancel
                    </Button>
                    <Button
                        outline
                        color="primary"
                        type="submit"
                        key="submit"
                        form="player-form"
                    >
                        {loadingPlayers ? 'Saving' : 'Save'}
                    </Button>
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
            onClick: () => this.editPlayerModal && this.editPlayerModal.toggle(),
        },

    ]);
}

const mapStateToProps = (state, ownProps) => ({
    loadingPlayers: state.players.loading,
    player: getPlayerById(state, ownProps.match.params.id),
    games: getPlayerGamesById(state, ownProps.match.params.id),
});

const mapDispatchToProps = {
    editPlayer,
    deletePlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
