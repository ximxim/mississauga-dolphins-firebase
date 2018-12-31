import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
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
                    header={this.renderScoreModalHeader}
                    body={() => this.renderScoreModalBody(event)}
                    footer={() => this.renderScoreModalFooter(event)}
                    ref={(o) => { this.ScoreModal = o; }}
                />
                <Modal
                    header={this.renderAddPlayersModalHeader}
                    body={this.renderAddPlayersModalBody}
                    footer={this.renderAddPlayersModalFooter}
                    ref={(o) => { this.AddPlayersModal = o; }}
                />
            </div>
        );
    }

    ScoreActions = () => ([
        {
            icon: 'play-circle',
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
            icon: 'trash-alt',
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
            icon: 'pencil-alt',
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
            icon: 'stop-circle',
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

    NavbarOptions = () => ([
        {
            icon: 'pencil-alt',
            label: 'Score',
            key: 'score',
            onClick: this.ScoreModal ? this.ScoreModal.toggle : null,
        },
        {
            icon: 'user-plus',
            label: 'Add Player',
            key: 'addPlayer',
            onClick: this.ScoreModal ? this.AddPlayersModal.toggle : null,
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

    renderScoreModalHeader = () => <h4>Score Card</h4>

    renderAddPlayersModalHeader = () => <h4>Add Players</h4>

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

    addPlayer = selectedPlayer => this.setState(
        { selectedPlayer },
        this.handleAddPlayer,
    )

    renderScoreModalFooter = () => (
        <div>
            {this.ScoreActions().map((action) => {
                if (action.hidden) return null;
                return (
                    <Button
                        outline
                        color={action.color}
                        key={action.key}
                        onClick={action.onClick}
                        className="mx-1"
                    >
                        {action.label}
                    </Button>
                );
            })}
        </div>
    )

    renderAddPlayersModalFooter = () => {
        const { loadingEvents } = this.props;
        const { playerName } = this.state;

        return (
            <div>
                <Button
                    color="secondary"
                    outline
                    onClick={this.AddPlayersModal ? this.AddPlayersModal.toggle : null}
                    key="cancelAddPlayer"
                    className="mr-1"
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    outline
                    onClick={this.handleAddPlayer}
                    disabled={!playerName || loadingEvents}
                    key="addPlayer"
                >
                    Add Player
                </Button>
            </div>
        );
    }

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
