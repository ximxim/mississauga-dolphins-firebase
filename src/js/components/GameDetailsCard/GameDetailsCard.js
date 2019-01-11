import React from 'react';
import classnames from 'classnames';

import { Game } from '../../redux/modules/Scores/types';
import { GameCover } from './GameDetailsCard.styled';

type Props = {
	game: Game,
};

export default class GameDetailsCard extends React.Component<Props, *> {
    state = {
        show: false,
    };

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
        const parClass = classnames({
            'mb-1': true,
            'text-cutoff': !this.state.show,
        });

        return (
            <div className={parClass} onClick={this.toggleShow}>
                <span className="heading">{heading}</span>
                <span className="ml-1">{value}</span>
            </div>
        );
    }

    toggleShow = () => this.setState(state => ({ show: !state.show }))
}
