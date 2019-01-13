import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';

import { Card } from './PlayerCard.styled';

import { Player } from '../../../redux/modules/Players/types';


type Props = {
    player: Player,
    selected: Boolean,
}

class GameCard extends React.Component<Props, *> {
    props: Props;

    render() {
        const { player, selected } = this.props;
        if (player.id === 2) { console.log(player); }
        return (
            <Card
                className="border-top px-1 py-2"
                key={player.id}
                selected={selected}
            >
                <div>
                    <h6 className="text-left mb-0">
                        <Link to={`/players/${player.id}`}>
                            {`${player.FIRST_NAME} ${player.LAST_NAME}`}
                        </Link>
                    </h6>
                </div>
                <div>
                    <p className="d-inline heading mr-1 mb-0">Role:</p>
                    <p className="d-inline mb-0">
                        {player.ROLE}
                    </p>
                </div>
                <div>
                    <p className="d-inline heading mr-1 mb-0">Total Games:</p>
                    {this.renderGamesPlayed(player)}
                </div>
                <div>
                    <p className="d-inline heading mr-1 mb-0">Date Joined:</p>
                    <p className="d-inline mb-0">
                        {player.DATE_JOINED}
                    </p>
                </div>
            </Card>
        );
    }

    renderGamesPlayed = (player) => {
        const total = player.games.length;
        const color = total > 0 ? 'success' : 'danger';
        return (
            <Badge
                color={color}
                className="d-inline mr-1 mb-0"
            >
                {total}
            </Badge>
        );
    }
}

export default GameCard;
