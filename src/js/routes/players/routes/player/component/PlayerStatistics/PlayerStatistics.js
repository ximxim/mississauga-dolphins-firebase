import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardHeader,
} from 'reactstrap';
import _ from 'lodash';

import { Player } from '../../../../../../redux/modules/Players/types';

type Props = {
    player: Player,
};

export default class PlayerStatistics extends Component<Props> {
    render() {
        const { player } = this.props;
        return (
            <div className="row no-gutters p-2">
                <div className="col-12">
                    <h2 className="d-block">Statistics</h2>
                </div>
                {this.renderStat('Matches', player.GENERAL.MTCHS)}
                {this.renderStat('Overs', player.BOWLING.OVERS)}
                {this.renderStat('Wickets', player.BOWLING.WKTS)}
                {this.renderStat('Maiden', player.BOWLING.MDNS)}
                {this.renderStat('Innings', player.BATTING.INNINGS)}
                {this.renderStat('Runs', player.BATTING.RUNS)}
                {this.renderStat('Highest', player.BATTING.HIGHEST)}
                {this.renderStat('4s', player.BATTING['4s'])}
                {this.renderStat('6s', player.BATTING['6s'])}
                {this.renderStat('50s', player.BATTING['50s'])}
                {this.renderStat('100s', player.BATTING['100s'])}
                {this.renderStat('No', player.BATTING.NO)}
                {this.renderStat('Average', player.BATTING.AVG)}
            </div>
        );
    }

    renderStat = (label, value) => (
        <div className="col-md-4 p-1">
            <Card>
                <CardHeader className="text-center">
                    {label}
                </CardHeader>
                <CardBody>
                    <CardTitle className="text-center mb-0">
                        {value ? _.parseInt(value).toFixed(0) : 0}
                    </CardTitle>
                </CardBody>
            </Card>
        </div>
    )
}
