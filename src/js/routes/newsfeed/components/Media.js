import React from 'react';
import { Player, BigPlayButton, ControlBar } from 'video-react';

import { Image, Thumbnail } from '../Newsfeed.styled';

export const renderVideo = ({ src, key }) => (
    <Player playsInline src={src} key={key}>
        <BigPlayButton position="center" />
        <ControlBar autoHide={false} />
    </Player>
);

export const renderImage = ({ src, key }) => (
    <div key={key}>
        <Image src={src} alt="Newsfeed" key={key} />
    </div>
);

export const renderThumbnail = ({ src }) => (
    <Thumbnail src={src} alt="thumbnail" />
);
