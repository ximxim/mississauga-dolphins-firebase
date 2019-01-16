import React, { Component } from 'react';

import { Feed } from '../../../redux/modules/NewsFeed/types';

type Props = {
    item: Feed,
}

export default class FacebookItem extends Component<Props> {
    render() {
        return <p>something facebook</p>;
    }
}
