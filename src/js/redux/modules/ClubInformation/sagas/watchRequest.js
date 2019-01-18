import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as clubInformationModule from '../index';

function getInformation() {
    const fClient = getClient();
    const ref = fClient.database().ref('/ContactInfo');
    return new Promise(resolve => ref.once(
        'value',
        snapshot => resolve(snapshot.val()),
        error => resolve(error),
    ));
}

export function* handleRequest() {
    const response = yield call(getInformation);
    if (response.code) {
        yield put(clubInformationModule.requestFailure(response));
        toast.error('Unable to get Contact Information');
    } else {
        yield put(clubInformationModule.requestSuccess(response));
    }
}

export default function* watchRequest() {
    yield takeEvery(clubInformationModule.REQUEST_INFORMATION, handleRequest);
}
