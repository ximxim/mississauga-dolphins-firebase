import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactTable from 'react-table';

import { EventsType } from '../../../../../../redux/modules/Events/types';

type Props = {
    games: Array<EventsType>,
};

export default class PlayerGames extends Component<Props> {
    render() {
        const { games } = this.props;
        if (games.length === 0) return null;

        const columns = [{
            Header: 'Title',
            accessor: 'title',
            Cell: this.renderGameTitle,
        }, {
            id: 'starts',
            Header: 'Starts',
            accessor: d => moment(d.start_time).format('LLLL'),
        }, {
            id: 'scored',
            Header: 'Scored',
            accessor: d => (d.game_id ? 'Yes' : 'No'),
        }, {
            id: 'players',
            Header: 'Players',
            accessor: d => (d.players ? d.players.length : 0),
        }];

        return (
            <div className="row no-gutters">
                <div className="col px-2 mb-4">
                    <h2>Games</h2>
                    <ReactTable
                        data={games}
                        columns={columns}
                        showPageSizeOptions={false}
                        minRows={0}
                        showPagination={games.length > 9}
                        pageSize={10}
                    />
                </div>
            </div>
        );
    }

    renderGameTitle = props => (
        <h6>
            <Link to={`/games/${props.original.id}`}>
                {props.value}
            </Link>
        </h6>
    )
}
