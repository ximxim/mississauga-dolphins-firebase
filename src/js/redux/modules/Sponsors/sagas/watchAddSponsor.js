import {
    call,
    takeEvery,
    put,
    select,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as sponsorsModule from '../index';

function addSponsor(sponsor) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Sponsors/${sponsor.ID}`);
    return new Promise((resolve) => {
        ref.set(sponsor, res => resolve(res));
    });
}

export function* handleAddSponsor({ payload: { values, callback } }) {
    const sponsors = yield select(state => state.sponsors.items);
    const sponsor = { ...values, ID: sponsors.length };
    const response = yield call(addSponsor, sponsor);
    if (response instanceof Error) {
        yield put(sponsorsModule.addSponsorFailure(response));
        toast.error('Unable to add sponsor. Try again later.');
    } else {
        yield put(sponsorsModule.addSponsorSuccess(sponsor));
        toast.success('Successfully added a new sponsor.');
    }
    callback();
}

export default function* watchAddSponsor() {
    yield takeEvery(sponsorsModule.ADD_SPONSOR, handleAddSponsor);
}
