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
import GameCard from './components/GameCard';
import { PlayersSuggestInput } from '../../../../components/ui';
import { SubNavbar, GameDetailsCard } from '../../../../components';

type Props = {
	players: Object,
	getEvent: Object,
	loadingEvents: Boolean,
	loadingScores: Boolean,
	getScoresByGameId: (string) => void,
	createGame: () => void,
	updateGame: () => void,
	finishGame: () => void,
	deleteGame: () => void,
	addPlayer: () => void,
	deletePlayer: () => void,
	match: {
		params: {
			id: string,
		},
	},
}

type State = {}

class Game extends Component<Props, State> {
	state = {
	  playerName: '',
	  selectedPlayer: -1,
	};

	render() {
	  const event = this.props.getEvent;
	  if (!event) return null;

	  return (
    <div>
        <div className="row no-gutters sticky-top">
            <div className="col">
                <SubNavbar>
                    <a>something</a>
                </SubNavbar>
            </div>
        </div>
        <div className="row no-gutters">
            <div className="col-md-4">
                <GameDetailsCard game={event} />
            </div>
            {this.renderGameMainContent(event)}
        </div>
    </div>
	  );
	}

	renderGameMainContent = game => (
    <div className="col-md-8">
        {this.renderScoringControls(game)}
        <h2 className="text-center">Players List</h2>
        {this.renderAddPlayersControl()}
    </div>
	);

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
                    onSuggestionSelected={
					  (event, { suggestion }) => this.setState(
						  { selectedPlayer: suggestion.id },
						  )
							}
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

	renderScoringControls = (game) => {
	  const score = this.props.getScoresByGameId(game.id);

	  if (!game.game_id) {
	    return (
    <GameCard
        players={this.props.players}
        loading={this.props.loadingScores}
        eventId={game.id}
        submit={this.props.createGame}
        addPlayer={selectedPlayer => this.setState({ selectedPlayer }, this.handleAddPlayer)
					}
				/>
	    );
	  }

	  if (score) {
	    if (game.game_id && !score.active) {
	    return (
    <GameCard
        players={this.props.players}
        eventId={game.id}
        update={this.handleUpdate}
        delete={this.handleDelete}
        loading={this.props.loadingScores}
        game={score}
        addPlayer={selectedPlayer => this.setState(
						    { selectedPlayer },
						    this.handleAddPlayer,
						  )
						}
    />
	    );
	  }
	  }

	  return (
    <GameCard
        players={this.props.players}
        eventId={game.id}
        update={this.handleUpdate}
        finish={this.handleFinish}
        loading={this.props.loadingScores}
        game={score}
        addPlayer={selectedPlayer => this.setState({ selectedPlayer }, this.handleAddPlayer)
				}
    />
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
