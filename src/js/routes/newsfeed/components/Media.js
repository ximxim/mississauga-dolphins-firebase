import React from 'react';

import { Image, Thumbnail } from '../Newsfeed.styled';

export const renderImage = ({ src, key }) => (
    <div key={key}>
        <Image src={src} alt="Newsfeed" />
    </div>
);

export const renderThumbnail = ({ src }) => (
    <Thumbnail src={src} alt="thumbnail" />
);
