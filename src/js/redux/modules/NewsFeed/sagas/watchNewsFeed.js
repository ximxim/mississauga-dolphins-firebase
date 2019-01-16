import { fork, all } from 'redux-saga/effects';

import watchRequest from './watchRequest';

export default function* watchNewsFeed() {
    yield all([fork(watchRequest)]);
}
