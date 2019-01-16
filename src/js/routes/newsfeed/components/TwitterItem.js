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
    renderVisibilityButton: () => Object,
}

export default class TwitterItem extends Component<Props> {
    render() {
        const { item, renderVisibilityButton } = this.props;
        return (
            <div className="shadow p-2 border-twitter">
                {this.renderAvatar(item)}
                {this.renderTweet(item)}
                {this.renderPhoto(item)}
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
    );

    renderTweet = (item) => {
        let tweet = item.title !== 'Untitled' ? <span>{item.title}</span> : null;
        tweet = item.entities ? this.renderWithEntities(item) : tweet;
        return <p>{tweet}</p>;
    }

    renderPhoto = (item) => {
        if (item.entities) {
            return _.map(item.entities.media, media => renderImage({
                src: media.media_url,
                key: media.media_url,
            }));
        }
        return null;
    }

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

    renderWithEntities = (item) => {
        let tweet = item.title;

        if (item.entities.urls) {
            item.entities.urls.map((link) => {
                const beginning = item.title.substr(
                    0,
                    item.title.indexOf(link.url),
                );
                const ending = item.title.substr(
                    item.title.indexOf(link.url) + link.url.length,
                    item.title.length,
                );
                const linkText = (
                    <a
                        href={link.expanded_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.url}
                    </a>
                );

                tweet = (
                    <span>
                        {beginning}
                        {linkText}
                        {ending}
                    </span>
                );
                return null;
            });
        }

        if (item.entities) {
            if (item.entities.media) {
                item.entities.media.map((media) => {
                    if (tweet.length > media.indices[1]) {
                        const beginning = tweet.substr(0, media.indices[0]);
                        const ending = tweet.substr(
                            media.indices[1],
                            tweet.length,
                        );
                        tweet = (
                            <span>
                                {beginning}
                                {ending}
                            </span>
                        );
                    }
                    return null;
                });
            }
        }
        return <span>{tweet}</span>;
    }
}
