import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DateTime } from '..';
import { Card } from './GameCard.styled';


type Props = {
    selected: Boolean,
    event: {
        id: string,
        title: string,
        start_time: string,
        game_id: string,
    },
}

class GameCard extends React.Component<Props, *> {
    props: Props;

    render() {
        const { event, selected } = this.props;
        const liveIndicator = event.score && event.score.active
            ? (
                <Badge color="danger" className="m-1">
                    <FontAwesomeIcon icon="rss" />
                </Badge>
            )
            : null;
        return (
            <Card
                className="border-top px-1 py-2"
                key={event.id}
                selected={selected}
            >
                <div>
                    <h6 className="text-left mb-0">
                        <Link to={`/games/${event.id}`}>
                            {liveIndicator}
                            {event.title}
                        </Link>
                    </h6>
                </div>
                <div>
                    <p className="d-inline heading mr-1 mb-0">Start date:</p>
                    <DateTime datetime={event.start_time} />
                </div>
                <div>
                    <p className="d-inline heading mr-1 mb-0">Scored:</p>
                    {this.renderScoreIndicator()}
                </div>
                <div>
                    <p className="d-inline heading mr-1 mb-0">Players:</p>
                    {this.renderPlayersCount()}
                </div>
            </Card>
        );
    }

    renderScoreIndicator = () => {
        const { event: { game_id: gameId } } = this.props;
        const badgeColor = gameId ? 'success' : 'danger';
        return (
            <Badge
                color={badgeColor}
                className="d-inline mr-1 mb-0"
            >
                {gameId ? 'Yes' : 'No'}
            </Badge>
        );
    }

    renderPlayersCount = () => {
        const { event: { players } } = this.props;
        const badgeColor = players && players.length > 0
            ? 'success' : 'danger';
        return (
            <Badge
                color={badgeColor}
                className="d-inline mr-1 mb-0"
            >
                {players ? `${players.length} players` : 'No players'}
            </Badge>
        );
    }
}

export default GameCard;
