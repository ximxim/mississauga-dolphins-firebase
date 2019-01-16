import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Carousel } from 'react-responsive-carousel';

// UI COMPONENTS
import { renderImage, renderThumbnail, renderVideo } from './Media';
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
            <div className="shadow p-2 border-facebook">
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
                    return this.renderCarousel(item.id, attachment.subattachments.data);
                }
                if (attachment.type.indexOf('video') > -1) {
                    return renderVideo({ src: item.source, key: item.id });
                }
                return null;
            });
        }
        return null;
    };

    renderItemMeta = (item) => {
        const cheers = item.applause ? item.applause : 0;
        const views = item.views ? item.views : 0;
        return (
            <p className="text-bold">
                {`${humanize(cheers)} cheers, ${humanize(views)} views`}
            </p>
        );
    };

    renderDate = item => (
        <div>
            <p className="note">
                {moment(item.date).fromNow().toUpperCase()}
            </p>
        </div>
    );

    renderCarousel = (id, media) => (
        <Carousel>
            {_.map(media, (m) => {
                const { src } = m.media.image;
                if (m.type === 'video') {
                    return renderVideo({ src });
                }

                if (m.type === 'photo') {
                    return (
                        <div>
                            <img src={src} alt="carousel" />
                        </div>
                    );
                }

                return null;
            })}
        </Carousel>
    )
}
