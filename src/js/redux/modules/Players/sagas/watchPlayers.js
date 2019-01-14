import { fork, all } from 'redux-saga/effects';

import watchPlayersRequest from './watchPlayersRequest';
import watchEditPlayer from './watchEditPlayer';
import watchDeletePlayer from './watchDeletePlayer';

function* rootSaga() {
    yield all([
        fork(watchPlayersRequest),
        fork(watchEditPlayer),
        fork(watchDeletePlayer),
    ]);
}

export default rootSaga;
