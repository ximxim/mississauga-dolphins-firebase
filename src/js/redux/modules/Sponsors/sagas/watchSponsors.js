import { fork, all } from 'redux-saga/effects';

import watchSponsorsRequest from './watchSponsorsRequest';
import watchAddSponsor from './watchAddSponsor';
import watchEditSponsor from './watchEditSponsor';
import watchDeleteSponsor from './watchDeleteSponsor';

function* rootSaga() {
    yield all([
        fork(watchSponsorsRequest),
        fork(watchAddSponsor),
        fork(watchEditSponsor),
        fork(watchDeleteSponsor),
    ]);
}

export default rootSaga;
