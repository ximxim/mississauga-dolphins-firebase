import React, { Component } from 'react';

import { Feed } from '../../../redux/modules/NewsFeed/types';

type Props = {
    item: Feed,
}

export default class InstagramItem extends Component<Props> {
    render() {
        return <p>something Instagram</p>;
    }
}
