import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component<*, *> {
    render() {
        return <p>player page</p>;
    }
}

const mapStateToProps = state => ({
    players: state.players,
});

export default connect(mapStateToProps)(Player);
