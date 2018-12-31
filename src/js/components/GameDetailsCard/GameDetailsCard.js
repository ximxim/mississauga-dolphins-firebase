import React from 'react';
import moment from 'moment';

import { Game } from '../../redux/modules/Scores/types';
import { GameCover, InfoCard } from './GameDetailsCard.styled';
import { FirebaseFileUploader } from '../ui';
import { imageAspects } from '../../utils/imageAspects';

type Props = {
	game: Game,
};

export default class GameDetailsCard extends React.Component<Props, *> {
    render() {
        const { game } = this.props;
        return (
            <div className="m-1">
                <FirebaseFileUploader
                    filename={game.id}
                    reference="events"
                    aspect={imageAspects.small}
                />
                <GameCover src={game.cover.source} alt="game cover" />
                <div className="row no-gutters mt-2">
                    <div className="col-6 pr-1">
                        <InfoCard>
                            <p>{moment(game.start_time).format('MMMM')}</p>
                            <p className="py-1">{moment(game.start_time).format('DD')}</p>
                        </InfoCard>
                    </div>
                    <div className="col-6 pl-1">
                        <InfoCard>
                            <p>Match #</p>
                            <p className="py-1">{game.match_no}</p>
                        </InfoCard>
                    </div>
                </div>
            </div>
        );
    }
}
