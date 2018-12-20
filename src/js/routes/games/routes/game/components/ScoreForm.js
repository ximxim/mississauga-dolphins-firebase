import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Input,
    Button,
    Table,
    Label,
} from 'reactstrap';
import moment from 'moment';

import { PlayersSuggestInput } from '../../../../../components/ui';
import { Player } from '../../../../../redux/modules/Players/types';
import ENV from '../../../../../../env';

type Props = {
    game: {},
    eventId: string,
    players: Array<Player>,
    addPlayer: () => void,
};

class ScoreForm extends Component<Props> {
    state = {
        home: {
            name: ENV.newGame.home.name || '',
            score: ENV.newGame.home.score || '0',
            wickets: ENV.newGame.home.wickets || '0',
            overs: ENV.newGame.home.overs || '0',
            batting: ENV.newGame.home.batting || true,
        },
        visitor: {
            name: ENV.newGame.visitor.name || '',
            score: ENV.newGame.visitor.score || '0',
            wickets: ENV.newGame.visitor.wickets || '0',
            overs: ENV.newGame.visitor.overs || '0',
            batting: ENV.newGame.visitor.batting || false,
        },
        striker: ENV.newGame.striker || '',
        nonStriker: ENV.newGame.nonStriker || '',
        bowler: ENV.newGame.bowler || '',
        active: false,
        updated_at: '',
        created_at: '',
        event_id: '',
    };

    componentDidMount() {
        const { game } = this.props;
        if (game) this.setState(game);
    }

    render() {
        return (
            <Form>
                <Table className="table">
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                </Table>
            </Form>
        );
    }

    renderTableHeader = () => (
        <thead>
            <tr>
                <th scope="col" className="border-0">
                    &nbsp;
                </th>
                <th scope="col" className="border-0">
                    Home
                </th>
                <th scope="col" className="border-0">
                    Visitor
                </th>
            </tr>
        </thead>
    )

    renderTableBody = () => (
        <tbody>
            <tr>
                <th className="border-0" scope="row">Name</th>
                <td className="border-0">{this.renderHomeTeamNameField()}</td>
                <td className="border-0">{this.renderVisitorTeamNameField()}</td>
            </tr>
            <tr>
                <th className="border-0" scope="row">Score</th>
                <td className="border-0">{this.renderHomeTeamScoreField()}</td>
                <td className="border-0">
                    {this.renderVisitorTeamScoreField()}
                </td>
            </tr>
            <tr>
                <th className="border-0" scope="row">Overs</th>
                <td className="border-0">{this.renderHomeTeamOversField()}</td>
                <td className="border-0">
                    {this.renderVisitorTeamOversField()}
                </td>
            </tr>
            <tr>
                <th className="border-0" scope="row">Wickets</th>
                <td className="border-0">{this.renderHomeTeamWicketsField()}</td>
                <td className="border-0">
                    {this.renderVisitorTeamWicketsField()}
                </td>
            </tr>
            <tr>
                <th className="border-0" scope="row">Batting</th>
                <td className="border-0 text-center">{this.renderHomeTeamBattingField()}</td>
                <td className="border-0 text-center">
                    {this.renderVisitorTeamBattingField()}
                </td>
            </tr>
            <tr>
                <th className="border-0" scope="row">Striker</th>
                <td className="border-0" colSpan="2">
                    {this.renderStrikerInput()}
                </td>
            </tr>
            <tr>
                <th className="border-0" scope="row">Non Striker</th>
                <td className="border-0" colSpan="2">
                    {this.renderNonStrikerInput()}
                </td>
            </tr>
            <tr>
                <th className="border-0" scope="row">Bowler</th>
                <td className="border-0" colSpan="2">
                    {this.renderBowlerInput()}
                </td>
            </tr>
        </tbody>
    );

    renderHomeTeamNameField = () => (
        <FormGroup className="has-wrapper my-1">
            <Input
                type="text"
                value={this.state.home.name}
                name="home-team"
                id="home-team-name"
                className="has-input input-sm"
                placeholder="Enter Name"
                onChange={(event) => {
                    const name = event.target.value;
                    this.setState(state => ({
                        home: {
                            ...state.home,
                            name,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderStrikerInput = () => {
        const { striker } = this.state;
        const { players } = this.props;

        return (
            <PlayersSuggestInput
                players={players}
                value={striker}
                placeholder="Entere a player name"
                onSuggestionSelected={(e, { suggestion }) => this.props.addPlayer(suggestion.id)}
                onChange={(event, { newValue }) => this.setState({ striker: newValue })}
            />
        );
    };

    renderNonStrikerInput = () => {
        const { nonStriker } = this.state;
        const { players } = this.props;

        return (
            <PlayersSuggestInput
                players={players}
                value={nonStriker}
                placeholder="Enter a player name"
                onSuggestionSelected={(e, { suggestion }) => this.props.addPlayer(suggestion.id)}
                onChange={(event, { newValue }) => this.setState({ nonStriker: newValue })}
            />
        );
    };

    renderBowlerInput = () => {
        const { bowler } = this.state;
        const { players } = this.props;

        return (
            <PlayersSuggestInput
                players={players}
                value={bowler}
                placeholder="Enter a player name"
                onSuggestionSelected={(e, { suggestion }) => this.props.addPlayer(suggestion.id)}
                onChange={(event, { newValue }) => this.setState({ bowler: newValue })}
            />
        );
    };

    renderVisitorTeamNameField = () => (
        <FormGroup className="has-wrapper my-1">
            <Input
                type="text"
                value={this.state.visitor.name}
                name="visitor-team"
                id="visitor-team-name"
                className="has-input input-sm"
                placeholder="Enter Name"
                onChange={(event) => {
                    const name = event.target.value;
                    this.setState(state => ({
                        visitor: {
                            ...state.visitor,
                            name,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderHomeTeamScoreField = () => (
        <FormGroup className="has-wrapper my-1">
            <Input
                type="number"
                value={this.state.home.score}
                name="home-team-score"
                id="home-team-score"
                className="has-input input-sm"
                placeholder="Enter Score"
                onChange={(event) => {
                    const score = event.target.value;
                    this.setState(state => ({
                        home: {
                            ...state.home,
                            score,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderVisitorTeamScoreField = () => (
        <FormGroup className="has-wrapper my-1">
            <Input
                type="number"
                value={this.state.visitor.score}
                name="visitor-team-score"
                id="visitor-team-score"
                className="has-input input-sm"
                placeholder="Enter Score"
                onChange={(event) => {
                    const score = event.target.value;
                    this.setState(state => ({
                        visitor: {
                            ...state.visitor,
                            score,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderHomeTeamWicketsField = () => (
        <FormGroup className="has-wrapper my-1">
            <Input
                type="number"
                value={this.state.home.wickets}
                name="home-team-wickets"
                id="home-team-wickets"
                className="has-input input-sm"
                placeholder="Enter Wickets"
                onChange={(event) => {
                    const wickets = event.target.value;
                    this.setState(state => ({
                        home: {
                            ...state.home,
                            wickets,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderVisitorTeamWicketsField = () => (
        <FormGroup className="has-wrapper my-1">
            <Input
                type="number"
                value={this.state.visitor.wickets}
                name="visitor-team-wickets"
                id="visitor-team-wickets"
                className="has-input input-sm"
                placeholder="Enter Wickets"
                onChange={(event) => {
                    const wickets = event.target.value;
                    this.setState(state => ({
                        visitor: {
                            ...state.visitor,
                            wickets,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderHomeTeamOversField = () => (
        <FormGroup className="has-wrapper my-1">
            <Input
                type="number"
                value={this.state.home.overs}
                name="home-team-overs"
                id="home-team-overs"
                className="has-input input-sm"
                placeholder="Enter Overs"
                onChange={(event) => {
                    const overs = event.target.value;
                    this.setState(state => ({
                        home: {
                            ...state.home,
                            overs,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderVisitorTeamOversField = () => (
        <FormGroup className="has-wrapper my-1">
            <Input
                type="number"
                value={this.state.visitor.overs}
                name="visitor-team-overs"
                id="visitor-team-overs"
                className="has-input input-sm"
                placeholder="Enter Overs"
                onChange={(event) => {
                    const overs = event.target.value;
                    this.setState(state => ({
                        visitor: {
                            ...state.visitor,
                            overs,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderHomeTeamBattingField = () => (
        <FormGroup check>
            <Label check>
                <Input
                    type="checkbox"
                    checked={this.state.home.batting}
                    name="home-team-batting"
                    id="home-team-batting"
                    onChange={(event) => {
                        const { checked } = event.target;
                        this.setState(state => ({
                            home: {
                                ...state.home,
                                batting: checked,
                            },
                            visitor: {
                                ...state.visitor,
                                batting: !checked,
                            },
                        }));
                    }}
                />
                &nbsp;
            </Label>
        </FormGroup>
    );

    renderVisitorTeamBattingField = () => (
        <FormGroup check>
            <Label check>
                <Input
                    type="checkbox"
                    checked={this.state.visitor.batting}
                    name="visitor-team-batting"
                    id="visitor-team-batting"
                    onChange={(event) => {
                        const { checked } = event.target;
                        this.setState(state => ({
                            home: {
                                ...state.home,
                                batting: !checked,
                            },
                            visitor: {
                                ...state.visitor,
                                batting: checked,
                            },
                        }));
                    }}
                />
                &nbsp;
            </Label>
        </FormGroup>
    );

    getScore = options => ({
        ...this.state,
        ...options,
        created_at: moment().format(),
        updated_at: moment().format(),
        event_id: this.props.eventId,
    })
}

export default ScoreForm;
