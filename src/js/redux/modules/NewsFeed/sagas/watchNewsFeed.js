import { fork, all } from 'redux-saga/effects';

import watchRequest from './watchRequest';
import watchUpdate from './watchUpdate';

export default function* watchNewsFeed() {
    yield all([fork(watchRequest)]);
    yield all([fork(watchUpdate)]);
}
