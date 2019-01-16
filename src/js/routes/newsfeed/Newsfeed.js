import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'reactstrap';

import { requestFeed } from '../../redux/modules/NewsFeed';
import TwitterItem from './components/TwitterItem';
import FacebookItem from './components/FacebookItem';
import InstagramItem from './components/InstagramItem';
import requireAuth from '../../utils/requiresAuth';
import { Newsfeed as NewsfeedType } from '../../redux/modules/NewsFeed/types';

type Props = {
    newsfeed: NewsfeedType,
    requestFeed: () => void,
};

class Newsfeed extends Component<Props, *> {
    render() {
        const { newsfeed: { loading } } = this.props;
        return (
            <div>
                <h2 className="p-2">Newsfeed</h2>
                <div className="card-columns p-2 pr-3 mr-5">
                    {this.renderNewsFeed()}
                </div>
                <div className="row no-gutters">
                    <div className="col-md-4 offset-md-4 mb-4">
                        <Button
                            block
                            outline
                            color="primary"
                            disabled={loading}
                            onClick={this.props.requestFeed}
                        >
                            {loading ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    renderNewsFeed = () => {
        const { feed } = this.props.newsfeed;
        const ascendingFeed = _.sortBy(feed, ['date']);
        const descendingFeed = ascendingFeed.reverse();
        return _.map(descendingFeed, item => (
            <div className="card border-0">
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

const mapDispatchToProps = {
    requestFeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Newsfeed));
