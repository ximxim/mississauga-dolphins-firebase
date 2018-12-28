import { fork, all } from 'redux-saga/effects';

import watchMetaRequest from './watchMetaRequest';

function* rootSaga() {
  yield all([
    fork(watchMetaRequest),
  ]);
}

export default rootSaga;
