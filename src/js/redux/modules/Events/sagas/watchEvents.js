import { fork, all } from 'redux-saga/effects';

import watchEventsRequest from './watchEventsRequest';
import watchAddPlayer from './watchAddPlayer';
import watchDeletePlayer from './watchDeletePlayer';
import watchEditEvent from './watchEditEvent';

function* rootSaga() {
    yield all([
        fork(watchEventsRequest),
        fork(watchAddPlayer),
        fork(watchDeletePlayer),
        fork(watchEditEvent),
    ]);
}

export default rootSaga;
