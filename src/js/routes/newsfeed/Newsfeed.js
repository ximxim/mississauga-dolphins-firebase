import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'reactstrap';

import { requestFeed, updateItem } from '../../redux/modules/NewsFeed';
import TwitterItem from './components/TwitterItem';
import FacebookItem from './components/FacebookItem';
import InstagramItem from './components/InstagramItem';
import requireAuth from '../../utils/requiresAuth';
import { Newsfeed as NewsfeedType } from '../../redux/modules/NewsFeed/types';

type Props = {
    newsfeed: NewsfeedType,
    requestFeed: () => void,
    updateItem: () => void,
};

class Newsfeed extends Component<Props, *> {
    render() {
        const { newsfeed: { loading } } = this.props;
        return (
            <div className="container-fluid">
                <div className="row no-gutters">
                    <h2 className="p-2">Newsfeed</h2>
                    <div className="row no-gutters">
                        {this.renderNewsFeed()}
                    </div>
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
            <div className="col-md-4 p-1 border-0" key={item.id}>
                {this.renderNewsFeedItem(item)}
            </div>
        ));
    }

    renderNewsFeedItem = (item) => {
        if (item.twitter) {
            return (
                <TwitterItem
                    item={item}
                    renderVisibilityButton={this.renderVisibilityButton}
                />
            );
        } else if (item.facebook) {
            return (
                <FacebookItem
                    item={item}
                    renderVisibilityButton={this.renderVisibilityButton}
                />
            );
        } else if (item.instagram) {
            return (
                <InstagramItem
                    item={item}
                    renderVisibilityButton={this.renderVisibilityButton}
                />
            );
        } else {
            return null;
        }
    }

    renderVisibilityButton = (item) => {
        const { newsfeed: { loading } } = this.props;
        const cta = item.hidden ? 'Show Item' : 'Hide Item';
        return (
            <Button
                block
                outline
                disabled={loading}
                onClick={() => this.handleVisibilityUpdate(item, !item.hidden)}
                color="primary"
                className="mt-2"
            >
                {cta}
            </Button>

        );
    }

    handleVisibilityUpdate = (item, visibility) => this.props.updateItem({
        ...item,
        hidden: visibility,
    });
}

const mapStateToProps = state => ({
    newsfeed: state.newsfeed,
});

const mapDispatchToProps = {
    requestFeed,
    updateItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Newsfeed));
