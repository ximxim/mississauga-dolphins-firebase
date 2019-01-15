import {
    call,
    takeEvery,
    put,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as sponsorsModule from '../index';

function deleteSponsor(sponsor) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Sponsors/${sponsor.ID}`);
    return ref.remove();
}

export function* handleDeleteSponsor({ payload }) {
    yield call(deleteSponsor, payload);
    yield put(sponsorsModule.deleteSponsorSuccess(payload));
    toast.success('Successfully deleted sponsor.');
}

export default function* watchDeleteSponsor() {
    yield takeEvery(sponsorsModule.DELETE_SPONSOR, handleDeleteSponsor);
}
