import { fork, all } from 'redux-saga/effects';

import watchRequest from './watchRequest';
import watchUpdateInformation from './watchUpdateInformation';

function* rootSaga() {
    yield all([
        fork(watchRequest),
        fork(watchUpdateInformation),
    ]);
}

export default rootSaga;
