import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PlayerAvatar } from './PlayersList.styled';
import { Player } from '../../../../../redux/modules/Players/types';

type Props = {
    players: Array<Player>,
    deletePlayer: () => void,
};

export default class PlayersList extends Component<Props, *> {
    render() {
        if (!this.props.players) return null;
        return (
            <div>
                <h2>Players List</h2>
                <div className="row no-gutters">
                    {this.renderPlayers()}
                </div>
            </div>

        );
    }

    renderPlayers = () => _.map(this.props.players, (player, index) => ((player)
        ? (
            <div className="col-md-4 p-2" key={index}>
                <div className="d-flex align-items-center border-2 rounded-15 p-2 h-100">
                    <PlayerAvatar src={player.avatar ? player.avatar.thumbnail : player.DP} />
                    <div className="d-flex flex-column justify-content-center">
                        <h6 className="mb-0">
                            <Link to={`/players/${player.id}`}>
                                {`${player.FIRST_NAME} ${player.LAST_NAME}`}
                            </Link>
                        </h6>
                        <p className="mb-0 fs-1">{player.ROLE}</p>
                    </div>
                    <a
                        onClick={() => this.props.deletePlayer(player.id)}
                        className="close-button"
                    >
                        <FontAwesomeIcon icon="window-close" />
                    </a>
                </div>
            </div>
        )
        : null))
}
