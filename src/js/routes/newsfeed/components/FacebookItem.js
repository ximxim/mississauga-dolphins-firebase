import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

// UI COMPONENTS
import { renderImage, renderThumbnail } from './Media';
import { LongTextCollapser } from '../../../components/ui';

// UTILS
import { humanize } from '../../../utils/humanize';

// TYPES
import { Feed } from '../../../redux/modules/NewsFeed/types';

type Props = {
    item: Feed,
}

export default class FacebookItem extends Component<Props> {
    render() {
        const { item } = this.props;
        return (
            <div>
                {this.renderAvatar(item)}
                {this.renderTitle(item)}
                {this.renderAttachments(item)}
                {this.renderItemMeta(item)}
                {this.renderDate(item)}
            </div>
        );
    }

    renderAvatar = item => (
        <div className="d-flex mb-2">
            <div>
                {renderThumbnail({
                    src: item.user.picture.data.url,
                })}
            </div>
            <div className="ml-2">
                <h6 className="mb-0">{item.user.name}</h6>
                <p className="note">
                    {item.user.username}
                </p>
            </div>
        </div>
    );

    renderTitle = (item) => {
        let title;
        if (item.title !== 'Untitled') title = `${item.title}\n\n`;
        if (item.message) title += item.message;

        return (
            <LongTextCollapser>
                <p>{title}</p>
            </LongTextCollapser>
        );
    };

    renderAttachments = (item) => {
        if (item.attachments) {
            return item.attachments.data.map((attachment) => {
                if (attachment.type === 'photo'
                    || attachment.type === 'event'
                    || attachment.type === 'cover_photo'
                    || attachment.type === 'profile_media'
                ) {
                    const { src } = attachment.media.image;
                    return renderImage({ src, key: item.id });
                }
                if (attachment.type === 'album' || attachment.type === 'new_album') {
                    return null;
                    // <CardItem key={attachment.type} noPadding>
                    // {this.renderCarousel(item.id, attachment.subattachments.data)}
                    // </CardItem>
                }
                if (attachment.type.indexOf('video') > -1) {
                    return null;
                    // <CardItem key={item.source} noPadding>
                    //     {renderVideo({
                    //         uri: item.source,
                    //         height: getHeight(dimensions, 'video'),
                    //         onPress: toggleAudio,
                    //         shouldPlay: item.isOnScreen,
                    //         opacityAnimate: this.state.opacityAnimation,
                    //         onProgress: this.handleVideoProgress,
                    //         videoPositionInMinutes: this.state.videoPositionInMinutes,
                    //         isMuted,
                    //     })}
                    // </CardItem>
                }
                return null;
            });
        }
        return null;
    };

    renderItemMeta = item => (<p>Item meta</p>);

    renderDate = item => (<p>Date</p>);
}
