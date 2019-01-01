import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// REDUX
import {
    getEventById,
    getScoresByGameId,
} from '../../../../redux/selectors';
import {
    createGame,
    updateGame,
    finishGame,
    deleteGame,
} from '../../../../redux/modules/Scores';
import {
    addPlayer,
    deletePlayer,
} from '../../../../redux/modules/Events';

// UI COMPONENTS
import ScoreForm from './components/ScoreForm';
import ScoreCard from './components/ScoreCard';
import GameForm from './components/GameForm';
import PlayersList from './components/PlayersList';
import { PlayersSuggestInput, Modal } from '../../../../components/ui';
import { GameDetailsCard } from '../../../../components';
import Navbar from '../../components/Navbar';


type Props = {
  players: Object,
  getEvent: Object,
  loadingEvents: Boolean,
  loadingScores: Boolean,
  match: {
    params: {
      id: string,
    },
  },
  getScoresByGameId: (string) => void,
  createGame: () => void,
  updateGame: () => void,
  finishGame: () => void,
  deleteGame: () => void,
  addPlayer: () => void,
  deletePlayer: () => void,
};

class Game extends Component<Props, *> {
    state = {
        playerName: '',
        selectedPlayer: -1,
    };

    render = () => {
        const event = this.props.getEvent;
        if (!event) return null;

        return (
            <div>
                <div className="row no-gutters sticky-top">
                    <div className="col">
                        <Navbar options={this.NavbarOptions()} />
                    </div>
                </div>
                <div className="row no-gutters mt-2 mr-1">
                    <div className="col-md-8 pl-2">
                        <ScoreCard game={event} score={this.props.getScoresByGameId(event.id)} />
                    </div>
                    <div className="col-md-4">
                        <GameDetailsCard game={event} />
                    </div>
                    <div className="col px-1 mt-4">
                        <PlayersList players={this.getEventPlayers()} />
                    </div>
                </div>
                <Modal
                    header="Score Card"
                    body={() => this.renderScoreModalBody(event)}
                    footer={this.scoreModalOptions()}
                    ref={(o) => { this.ScoreModal = o; }}
                />
                <Modal
                    header="Add Players"
                    body={this.renderAddPlayersModalBody}
                    footer={this.addPlayersModalOptions()}
                    ref={(o) => { this.AddPlayersModal = o; }}
                />
                <Modal
                    header="Edit Game"
                    body={() => this.renderEditGameModalBody(event)}
                    footer={this.gameModalOptions()}
                    ref={(o) => { this.gameEditModal = o; }}
                />
            </div>
        );
    }

    NavbarOptions = () => ([
        {
            icon: 'list-ol',
            label: 'Score',
            key: 'score',
            onClick: () => (this.ScoreModal ? this.ScoreModal.toggle() : null),
        },
        {
            icon: 'user-plus',
            label: 'Add Player',
            key: 'addPlayer',
            onClick: () => (this.AddPlayersModal ? this.AddPlayersModal.toggle() : null),
        },
        {
            icon: 'pencil-alt',
            label: 'Edit Game',
            key: 'editGame',
            onClick: () => (this.gameEditModal ? this.gameEditModal.toggle() : null),
        },
    ]);

    handleUpdate = (form) => {
        const selectedGame = this.props.getScoresByGameId(form.event_id);
        this.props.updateGame({ id: selectedGame.id, game: form });
    };

    handleFinish = (eventId) => {
        const selectedGame = this.props.getScoresByGameId(eventId);
        this.props.finishGame({ id: selectedGame.id, game: selectedGame });
    };

    handleDelete = (eventId) => {
        const selectedGame = this.props.getScoresByGameId(eventId);
        this.props.deleteGame({ id: selectedGame.id, game: selectedGame });
    };

    getEventPlayers = () => {
        const event = this.props.getEvent;
        const playersList = this.props.players || [];
        return event.players
            ? _.map(event.players, id => playersList[id])
            : null;
    }

    renderScoreModalBody = event => (
        <ScoreForm
            players={this.props.players}
            loading={this.props.loadingScores}
            eventId={event.id}
            game={this.props.getScoresByGameId(event.id)}
            addPlayer={this.addPlayer}
            ref={(o) => { this.ScoreForm = o; }}
        />
    )

    renderAddPlayersModalBody = () => {
        const { players } = this.props;
        const { playerName } = this.state;

        return (
            <PlayersSuggestInput
                players={players}
                placeholder="Enter a player name"
                value={playerName}
                onSuggestionSelected={(event, { suggestion }) => this.setState(
                    { selectedPlayer: suggestion.id },
                )}
                onChange={(event, { newValue }) => this.setState(
                    { playerName: newValue },
                )}
            />
        );
    }

    renderEditGameModalBody = event => (
        <GameForm game={event} ref={(o) => { this.gameForm = o; }} />
    )

    scoreModalOptions = () => ([
        {
            label: 'Start',
            key: 'start',
            color: 'primary',
            hidden: !this.gameHasNoScore(),
            onClick: () => {
                const score = this.ScoreForm.getScore({ active: true });
                this.props.createGame(score);
            },
        },
        {
            label: 'Remove',
            key: 'remove',
            color: 'danger',
            hidden: !this.gameHasScoreAndIsInactive(),
            onClick: () => {
                const score = this.ScoreForm.getScore();
                this.handleDelete(score.event_id);
                this.ScoreModal.toggle();
            },
        },
        {
            label: 'Update',
            key: 'update',
            color: 'primary',
            hidden: !(this.gameHasScoreAndIsInactive() || this.gameIsActive()),
            onClick: () => {
                const score = this.ScoreForm.getScore({ active: true });
                this.handleUpdate(score);
                this.ScoreModal.toggle();
            },
        },
        {
            label: 'Finish',
            key: 'finish',
            color: 'danger',
            hidden: !this.gameIsActive(),
            onClick: () => {
                const score = this.ScoreForm.getScore({ active: false });
                this.handleFinish(score.event_id);
                this.ScoreModal.toggle();
            },
        },
    ]);

    addPlayersModalOptions = () => {
        const { loadingEvents } = this.props;
        const { playerName } = this.state;
        const disabled = !playerName || loadingEvents;
        return [
            {
                label: 'Cancel',
                key: 'cancel',
                color: 'secondary',
                onClick: () => {
                    if (this.AddPlayersModal) this.AddPlayersModal.toggle();
                },
            },
            {
                label: 'Add Player',
                key: 'addPlayer',
                color: 'primary',
                onClick: this.handleAddPlayer,
                disabled,
            },
        ];
    };

    gameModalOptions = () => [
        {
            label: 'Cancel',
            key: 'cancel',
            color: 'secondary',
            onClick: () => {
                if (this.gameEditModal) this.gameEditModal.toggle();
            },
        },
        {
            label: 'Save',
            key: 'save',
            color: 'primary',
            onClick: () => console.log(this.gameForm.getUpdatedGame()),
        },
    ];

    addPlayer = selectedPlayer => this.setState(
        { selectedPlayer },
        this.handleAddPlayer,
    )

    handleAddPlayer = () => {
        const eventId = this.props.match.params.id;
        const playerId = this.state.selectedPlayer;

        this.props.addPlayer({ eventId, playerId });
        this.setState({ selectedPlayer: '', playerName: '' });
    };

    handleDeletePlayer = (playerId) => {
        const eventId = this.props.match.params.id;

        this.props.deletePlayer({ eventId, playerId });
    };

    gameHasNoScore = () => !this.props.getEvent.game_id;

    gameHasScoreAndIsInactive = () => {
        const game = this.props.getEvent;
        const score = this.props.getScoresByGameId(game.id);
        return score ? (game.game_id && !score.active) : false;
    };

    gameIsActive = () => !this.gameHasNoScore() && !this.gameHasScoreAndIsInactive();
}

const mapStateToProps = (state, ownProps) => ({
    players: state.players.items,
    getEvent: getEventById(state, ownProps.match.params.id),
    getScoresByGameId: id => getScoresByGameId(state, id),
    loadingScores: state.scores.loading,
    loadingEvents: state.events.loading,
});

const mapDispatchToProps = {
    createGame,
    updateGame,
    finishGame,
    deleteGame,
    addPlayer,
    deletePlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
