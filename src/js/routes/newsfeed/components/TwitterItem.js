import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

// UI COMPONENTS
import { renderImage, renderThumbnail } from './Media';

// UTILS
import { humanize } from '../../../utils/humanize';

// TYPES
import { Feed } from '../../../redux/modules/NewsFeed/types';

type Props = {
    item: Feed,
}

export default class TwitterItem extends Component<Props> {
    render() {
        const { item } = this.props;
        return (
            <div key={item.key}>
                {this.renderAvatar(item)}
                {this.renderTweet(item)}
                {this.renderPhoto(item)}
                {this.renderItemMeta(item)}
                {this.renderDate(item)}
            </div>
        );
    }

    renderAvatar = item => (
        <div className="d-flex">
            <div>
                {renderThumbnail({
                    src: item.user.profile_image_url_https,
                })}
            </div>
            <div className="ml-2">
                <h6 className="mb-0">{item.user.name}</h6>
                <p className="note">
                    {`@${item.user.screen_name}`}
                </p>
            </div>
        </div>
    ) ;

    renderTweet = item => (<p>tweet</p>) ;

    renderPhoto = item => (<p>photo</p>) ;

    renderItemMeta = item => (<p>meta</p>) ;

    renderDate = item => (<p>date</p>) ;
}
