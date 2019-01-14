import React, { Component } from 'react';

import { Avatar } from './PlayerDetails.styled';
import { Player } from '../../../../../../redux/modules/Players/types';

type Props = {
    player: Player,
};

export default class PlayerDetails extends Component<Props> {
    render() {
        const { player } = this.props;
        return (
            <div className="p-2">
                <h2>Profile</h2>
                <Avatar src={player.avatar ? player.avatar.source : player.DP} alt="avatar" />
                {this.renderInfoItem('Name', `${player.FIRST_NAME} ${player.LAST_NAME}`)}
                {this.renderInfoItem('Role', player.ROLE)}
                {this.renderInfoItem('Batting Style', player.BATING_STYLE)}
                {this.renderInfoItem('Bowling Style', player.BOWLING_STYLE)}
                {this.renderInfoItem('Date Joined', player.DATE_JOINED)}
                {this.renderInfoItem('First Played', player.FIRST_PLAYED)}
                {this.renderInfoItem('Last Played', player.LAST_PLAYED)}
                {this.renderInfoItem('Honorary Mention', player.HONOR)}
            </div>
        );
    }

    renderInfoItem = (label, value) => (
        value
            ? (
                <div>
                    <p className="heading d-inline mr-1">{`${label}:`}</p>
                    <p className="d-inline">
                        {value}
                    </p>
                </div>
            )
            : null
    )
}
