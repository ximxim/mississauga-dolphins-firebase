import React, { Component } from 'react';
import moment from 'moment';
import {
    Alert,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardHeader,
} from 'reactstrap';

import { EventsType } from '../../../../../redux/modules/Events/types';
import { Game } from '../../../../../redux/modules/Scores/types';

type Props = {
    game: EventsType,
    score: Game,
};

export default class ScoreCard extends Component<Props, *> {
    render() {
        const { game, score } = this.props;
        return (
            <div>
                <h2>{game.title}</h2>
                <p>{moment(game.start_time).format('dddd, MMMM Do, YYYY [at] hh:mm a')}</p>
                {score ? this.renderScore(game, score) : this.renderEmptyState()}
            </div>
        );
    }

    renderEmptyState = () => <Alert color="warning">No Score, click on 'Score' button to update score</Alert>

    renderScore = (game, score) => (
        <div className="row no-gutters">
            <div className="col-md-6 pr-md-1">
                {this.renderScoreCard(score.home)}
            </div>
            <div className="col-md-6 pl-md-1">
                {this.renderScoreCard(score.visitor)}
            </div>
            <div className="col-12 mt-2">
                {this.rendeKeyPlayers('Striker', score.striker)}
            </div>
            <div className="col-12 mt-2">
                {this.rendeKeyPlayers('Non Striker', score.nonStriker)}
            </div>
            <div className="col-12 mt-2">
                {this.rendeKeyPlayers('Bowler', score.bowler)}
            </div>
        </div>
    )

    renderScoreCard = score => (
        <Card>
            <CardHeader className="text-center">
                {score.name}
            </CardHeader>
            <CardBody>
                <CardTitle className="text-center">
                    {`${score.score}/${score.wickets}`}
                </CardTitle>
                <CardSubtitle className="text-center">
                    {`${score.overs} overs`}
                </CardSubtitle>
            </CardBody>
        </Card>
    )

    rendeKeyPlayers = (title, body) => (
        <Card>
            <CardHeader className="text-center">
                {title}
            </CardHeader>
            <CardBody>
                <CardTitle className="text-center">
                    {body}
                </CardTitle>
            </CardBody>
        </Card>
    )
}
