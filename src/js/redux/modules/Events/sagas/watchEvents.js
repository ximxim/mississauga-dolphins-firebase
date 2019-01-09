import { fork, all } from 'redux-saga/effects';

import watchEventsRequest from './watchEventsRequest';
import watchAddPlayer from './watchAddPlayer';
import watchDeletePlayer from './watchDeletePlayer';
import watchEditEvent from './watchEditEvent';
import watchDeleteEvent from './watchDeleteEvent';
import watchAddGameEvent from './watchAddGameEvent';

function* rootSaga() {
    yield all([
        fork(watchEventsRequest),
        fork(watchAddPlayer),
        fork(watchDeletePlayer),
        fork(watchEditEvent),
        fork(watchDeleteEvent),
        fork(watchAddGameEvent),
    ]);
}

export default rootSaga;
