import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import TwitterItem from './components/TwitterItem';
import FacebookItem from './components/FacebookItem';
import InstagramItem from './components/InstagramItem';
import requireAuth from '../../utils/requiresAuth';
import { Newsfeed as NewsfeedType } from '../../redux/modules/NewsFeed/types';

type Props = {
    newsfeed: NewsfeedType,
};

class Newsfeed extends Component<Props, *> {
    render() {
        return (
            <div className="row no-gutters">
                {this.renderNewsFeed()}
            </div>
        );
    }

    renderNewsFeed = () => {
        const { feed, loading } = this.props.newsfeed;
        const ascendingFeed = _.sortBy(feed, ['date']);
        const descendingFeed = ascendingFeed.reverse();
        if (loading) return null;
        return _.map(descendingFeed, item => (
            <div className="col-md-4">
                {this.renderNewsFeedItem(item)}
            </div>
        ));
    }

    renderNewsFeedItem = (item) => {
        if (item.twitter) {
            return <TwitterItem item={item} />;
        } else if (item.facebook) {
            return <FacebookItem item={item} />;
        } else if (item.instagram) {
            return <InstagramItem item={item} />;
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    newsfeed: state.newsfeed,
});

export default connect(mapStateToProps)(requireAuth(Newsfeed));
