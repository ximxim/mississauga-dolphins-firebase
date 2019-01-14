import { fork, all } from 'redux-saga/effects';

import watchPlayersRequest from './watchPlayersRequest';
import watchEditPlayer from './watchEditPlayer';
import watchDeletePlayer from './watchDeletePlayer';
import watchAddPlayer from './watchAddPlayer';

function* rootSaga() {
    yield all([
        fork(watchPlayersRequest),
        fork(watchEditPlayer),
        fork(watchDeletePlayer),
        fork(watchAddPlayer),
    ]);
}

export default rootSaga;
