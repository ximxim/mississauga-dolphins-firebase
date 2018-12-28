import React, { Component } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Alert,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardHeader,
    Badge,
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
                <div className="mb-3">
                    <h2 className="mb-0">{game.title}</h2>
                    <p className="d-inline">{moment(game.start_time).format('dddd, MMMM Do, YYYY [at] hh:mm a')}</p>
                    {this.renderIndicator(score)}
                </div>
                {score ? this.renderScore(game, score) : this.renderEmptyState()}
            </div>
        );
    }

    renderIndicator = score => (
        score
            ? (
                <Badge color={score.active ? 'danger' : 'secondary'} className="ml-2">
                    <FontAwesomeIcon icon="rss" />
                    <span className="ml-1">{score.active ? 'Live' : 'Offline'}</span>
                </Badge>
            )
            : null
    )

    renderEmptyState = () => <Alert color="warning">No Score, click on 'Score' button to update score</Alert>

    renderScore = (game, score) => (
        <div className="row no-gutters">
            <div className="col-md-6 pr-md-1 mt-2">
                {this.renderScoreCard(score.home)}
            </div>
            <div className="col-md-6 pl-md-1 mt-2">
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
        body
            ? (
                <Card>
                    <CardHeader className="text-center">
                        {title}
                    </CardHeader>
                    <CardBody>
                        <CardTitle className="text-center py-1 mb-0">
                            {body}
                        </CardTitle>
                    </CardBody>
                </Card>
            )
            : null
    )
}
