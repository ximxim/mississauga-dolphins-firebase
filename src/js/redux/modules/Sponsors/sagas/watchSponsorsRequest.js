import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as sponsorsModule from '../index';

function getSponsors() {
    const fClient = getClient();
    const ref = fClient.database().ref('/Sponsors');
    return new Promise(resolve => ref.once(
        'value',
        snapshot => resolve(snapshot.val()), error => resolve(error),
    ));
}

export function* handleRequest() {
    const response = yield call(getSponsors);
    if (response.code) {
        yield put(sponsorsModule.requestSponsorsFailure(response));
        toast.error(`SPONSORS DATA: ${response.code}`);
    } else {
        yield put(sponsorsModule.requestSponsorsSuccess(response));
    }
}

export default function* watchRequest() {
    yield takeEvery(sponsorsModule.REQUEST_SPONSORS, handleRequest);
}
