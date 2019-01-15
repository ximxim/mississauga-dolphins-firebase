import { fork, all } from 'redux-saga/effects';

import watchSponsorsRequest from './watchSponsorsRequest';

function* rootSaga() {
    yield all([
        fork(watchSponsorsRequest),
    ]);
}

export default rootSaga;
