import React, { Component } from 'react';
import _ from 'lodash';

import { PlayerAvatar } from './PlayersList.styled';
import { Player } from '../../../../../redux/modules/Players/types';

type Props = {
    players: Array<Player>,
};

export default class PlayersList extends Component<Props, *> {
    render() {
        return (
            <div>
                <h2>Players List</h2>
                <div className="row no-gutters">
                    {this.renderPlayers()}
                </div>
            </div>

        );
    }

    renderPlayers = () => _.map(this.props.players, player => ((player)
        ? (
            <div className="col-md-4 p-2">
                <div className="d-flex align-items-center border-2 rounded-15 p-2">
                    <PlayerAvatar src={player.DP} />
                    <div className="d-flex flex-column justify-content-center">
                        <h6 className="mb-0">
                            {`${player.FIRST_NAME} ${player.LAST_NAME}`}
                        </h6>
                        <p className="mb-0 fs-1">{player.ROLE}</p>
                    </div>
                </div>
            </div>
        )
        : null))
}
