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
    renderVisibilityButton: () => Object,
}

export default class InstagramItem extends Component<Props> {
    render() {
        const { item, renderVisibilityButton } = this.props;
        return (
            <div className="shadow p-2 border-instagram">
                {this.renderAvatar(item)}
                {this.renderAttachments(item)}
                {this.renderTitle(item)}
                {this.renderItemMeta(item)}
                {this.renderDate(item)}
                {renderVisibilityButton(item)}
            </div>
        );
    }

    renderAvatar = item => (
        <div className="d-flex mb-2">
            <div>
                {renderThumbnail({
                    src: item.user.profile_picture,
                })}
            </div>
            <div className="ml-2">
                <h6 className="mb-0">{item.user.full_name}</h6>
                <p className="note">
                    {item.user.username}
                </p>
            </div>
        </div>
    );

    renderAttachments = (item) => {
        switch (item.type) {
        case 'video':
            const video = item.videos.standard_resolution; // eslint-disable-line
            return renderVideo({ src: video.url });
        case 'image':
            const image = item.images.standard_resolution; // eslint-disable-line
            return renderImage({ src: image.url, key: item.id });
        case 'carousel':
            return this.renderCarousel(item.id, item.carousel_media);
        default: return null;
        }
    };

    renderTitle = (item) => {
        const { title } = item;
        if (!title || title === 'Untitled') return null;

        return (
            <LongTextCollapser>
                <p>{title}</p>
            </LongTextCollapser>
        );
    };

    renderItemMeta = (item) => {
        const cheers = item.applause ? item.applause : 0;
        const views = item.views ? item.views : 0;
        return (
            <p className="text-bold mb-1">
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
            {_.map(media, (m, i) => {
                if (m.type === 'video') {
                    const src = m.video.standard_resolution.url;
                    return renderVideo({ src });
                }

                if (m.type === 'image') {
                    const src = m.images.standard_resolution.url;
                    return (
                        <div key={i}>
                            <img src={src} alt="carousel" />
                        </div>
                    );
                }

                return null;
            })}
        </Carousel>
    )
}
