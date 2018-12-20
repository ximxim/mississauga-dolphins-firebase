import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Button,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
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
import { PlayersSuggestInput } from '../../../../components/ui';
import { GameDetailsCard } from '../../../../components';
import Navbar from './components/Navbar';
import ScoreModal from './components/ScoreModal';

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

type State = {
    scoreModalVisible: false,
};

class Game extends Component<Props, State> {
  state = {
      playerName: '',
      selectedPlayer: -1,
  };

  render = () => {
      const { scoreModalVisible } = this.state;
      const event = this.props.getEvent;
      if (!event) return null;

      return (
          <div>
              <div className="row no-gutters sticky-top">
                  <div className="col">
                      <Navbar options={this.NavbarOptions()} />
                  </div>
              </div>
              <div className="row no-gutters">
                  <div className="col-md-4">
                      <GameDetailsCard game={event} />
                  </div>
                  <div className="col-md-8">
                      <h2 className="text-center">Players List</h2>
                      {this.renderAddPlayersControl()}
                  </div>
              </div>
              <ScoreModal
                  visible={scoreModalVisible}
                  toggle={this.toggleScoreModal}
                  header={this.renderScoreModalHeader}
                  body={() => this.renderScoreModalBody(event)}
                  footer={() => this.renderScoreModalFooter(event)}
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
            },
        },
    ]);

    NavbarOptions = () => ([
        {
            icon: 'pencil-alt',
            label: 'Score',
            key: 'score',
            onClick: this.toggleScoreModal,
        },
        {
            icon: 'user-plus',
            label: 'Add Player',
            key: 'addPlayer',
            onClick: this.toggleScoreModal,
        },
    ]);

  renderAddPlayersControl = () => {
      const { playerName } = this.state;

      return (
          <div className="card" style={{ margin: 10 }}>
              <div className="card-body">
                  <Form>
                      <PlayersSuggestInput
                          players={this.props.players}
                          placeholder="Enter a player name"
                          value={playerName}
                          onSuggestionSelected={(event, { suggestion }) => this.setState(
                              { selectedPlayer: suggestion.id },
                          )}
                          onChange={(event, { newValue }) => this.setState({ playerName: newValue })
                          }
                      />
                      <Button
                          className="btn-success text-white btn-md circle-btn-sm btn-block"
                          variant="raised"
                          onClick={this.handleAddPlayer}
                          disabled={!playerName || this.props.loadingEvents}
                          style={{ marginTop: 10 }}
                          key="addPlayer"
                      >
                        Add Player
                      </Button>
                      <br />
                  </Form>
                  {this.renderPlayersList()}
              </div>
          </div>
      );
  };

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

  renderPlayersList = () => {
      const event = this.props.getEvent;
      const playersList = this.props.players || [];
      if (!event.players) {
          return (
              <p className="text-center">No players added to this event</p>
          );
      }

      return (
          <ListGroup>
              {_.map(event.players, (id) => {
                  const player = playersList[id];
                  if (!player) return null;

                  return (
                      <ListGroupItem key={player.id}>
                          {player.FIRST_NAME}
                          {' '}
                          {player.LAST_NAME}
                          <Button
                              className="close"
                              onClick={() => this.handleDeletePlayer(player.id)
                              }
                              disabled={this.props.loadingEvents}
                          >
                              <span aria-hidden="true">&times;</span>
                          </Button>
                      </ListGroupItem>
                  );
              })}
          </ListGroup>
      );
  };

  renderScoreModalHeader = () => <h4>Score Card</h4>

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

  toggleScoreModal = () => this.setState(state => (
      { scoreModalVisible: !state.scoreModalVisible }
  ));
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game);
