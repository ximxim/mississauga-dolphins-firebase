import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as clubInformation from '../index';

function updateInformation(information) {
    const fClient = getClient();
    const ref = fClient.database().ref('/ContactInfo');
    return new Promise((resolve) => {
        ref.update(information, res => resolve(res));
    });
}

export function* handleUpdateInformation({ payload: { values, callback } }) {
    const response = yield call(updateInformation, values);
    if (response instanceof Error) {
        yield put(clubInformation.updateFailure(response));
        toast.error('Unable to update club information. Try again later.');
    } else {
        yield put(clubInformation.updateSuccess(values));
        toast.success('Successfully updated club information');
    }
    callback();
}

export default function* watchUpdateInformation() {
    yield takeEvery(clubInformation.UPDATE_INFORMATION, handleUpdateInformation);
}
