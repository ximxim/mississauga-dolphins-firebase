import {
    call,
    takeEvery,
    put,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as sponsorsModule from '../index';

function editSponsor(sponsor) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Sponsors/${sponsor.ID}`);
    return new Promise((resolve) => {
        ref.update(sponsor, res => resolve(res));
    });
}

export function* handleEditSponsor({ payload: { values, callback } }) {
    const response = yield call(editSponsor, values);
    if (response instanceof Error) {
        yield put(sponsorsModule.editSponsorFailure(response));
        toast.error('Unable to edit sponsor. Try again later.');
    } else {
        yield put(sponsorsModule.editSponsorSuccess(values));
        toast.success('Successfully edited sponsor.');
    }
    callback();
}

export default function* watchEditSponsor() {
    yield takeEvery(sponsorsModule.EDIT_SPONSOR, handleEditSponsor);
}
