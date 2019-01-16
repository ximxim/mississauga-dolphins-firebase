import React, { Component } from 'react';
import { connect } from 'react-redux';

import requireAuth from '../../utils/requiresAuth';

type Props = {};

class Newsfeed extends Component<Props, *> {
    render() {
        return <p>something</p>;
    }
}

const mapStateToProps = state => ({
    newsfeed: state.newsfeed,
});

export default connect(mapStateToProps)(requireAuth(Newsfeed));
