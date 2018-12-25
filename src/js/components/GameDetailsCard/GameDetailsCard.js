import React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import moment from 'moment';

import { Game } from '../../redux/modules/Scores/types';
import { GameCover } from './GameDetailsCard.styled';

type Props = {
	game: Game,
};

export default class GameDetailsCard extends React.Component<Props, *> {
    render() {
        const { game } = this.props;
        return (
            <div className="m-1">
                <GameCover src={game.cover.source} alt="game cover" />
                <p className="mb-0">
                    <FontAwesome.FaClockO
                        className="align-self-center fs-6 mr-2"
                    />
                    {moment(game.start_time).format(
                        'dddd, MMMM Do YYYY [at] h:mm a',
                    )}
                </p>
                <p className="mb-0">
                    <FontAwesome.FaInfoCircle
                        className="align-self-center fs-6 mr-2"
                    />
                    {game.match_no}
                </p>
            </div>
        );
        // return (
        // <div className="card m-1 border-2 rounded overflow-hidden">
        //     <div className="pb-2">
        //         <div className="position-relative text-center text-white">
        //             <img
        //                 src={game.cover.source}
        //                 alt="game cover"
        //                 className="w-100"
        //             />
        //         </div>
        //         <Table className="mb-0">
        //             <tbody>
        //                 <tr>
        //                     <td>
        //                         <FontAwesome.FaClockO
        //                             className="align-self-center fs-6"
        //                         />
        //                     </td>
        //                     <td style={{ textAlign: 'left' }}>
        //                         {moment(game.start_time).format(
        //                             'MMMM Do YYYY, h:mm: a',
        //                         )}
        //                     </td>
        //                 </tr>
        //                 <tr>
        //                     <td>
        //                         <FontAwesome.FaInfoCircle
        //                             className="align-self-center fs-6"
        //                         />
        //                     </td>
        //                     <td style={{ textAlign: 'left' }}>
        //                         <p>{game.match_no}</p>
        //                     </td>
        //                 </tr>
        //             </tbody>
        //         </Table>
        //     </div>
        // </div>
        // );
    }
}
