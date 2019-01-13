import React, { Component } from 'react';
import _ from 'lodash';

import { GameCard } from '../../../../../../components/ui';
import { EventsType } from '../../../../../../redux/modules/Events/types';

type Props = {
    games: Array<EventsType>,
};

export default class PlayerGames extends Component<Props> {
    render() {
        const { games } = this.props;

        return (
            <div className="row no-gutters">
                <div className="col">
                    <h2>Games</h2>
                    <div className="row">
                        {this.renderPlayerGames(games)}
                    </div>
                </div>
            </div>
        );
    }

    renderPlayerGames = games => _.map(games, game => (
        <div className="col-md-4" key={game.id}>
            <GameCard event={game} />
        </div>
    ))
}
