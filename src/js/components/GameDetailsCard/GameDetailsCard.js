import React from 'react';
import classnames from 'classnames';

import { Game } from '../../redux/modules/Scores/types';
import { GameCover } from './GameDetailsCard.styled';
import { LongTextCollapser } from '../ui';

type Props = {
	game: Game,
};

export default class GameDetailsCard extends React.Component<Props, *> {
    render() {
        const { game } = this.props;
        return (
            <div className="m-1 pl-4">
                <GameCover src={game.cover.source} alt="game cover" />
                <div className="row no-gutters mt-2">
                    <div className="col">
                        {this.renderInfoItem('Match No:', game.match_no)}
                        {this.renderInfoItem('Place:', game.place.name)}
                        {this.renderInfoItem('Division:', game.division)}
                        {this.renderInfoItem('Round Type:', game.round_type)}
                        {this.renderInfoItem('Description:', game.description)}
                    </div>
                </div>
            </div>
        );
    }

    renderInfoItem = (heading, value) => {
        if (heading === 'Description:') {
            return (
                <LongTextCollapser>
                    <div className="mb-1">
                        <span className="heading">{heading}</span>
                        <span className="ml-1">{value}</span>
                    </div>
                </LongTextCollapser>
            );
        }
        return (
            <div className="mb-1">
                <span className="heading">{heading}</span>
                <span className="ml-1">{value}</span>
            </div>
        );
    }
}
