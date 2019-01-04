import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as eventsModule from '../index';

function editEvent(event) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Events/${event.id}`);
    return new Promise((resolve) => {
        ref.update(event, res => resolve(res));
    });
}

export function* handleEditEvent({ payload: { values, callback } }) {
    const event = values;
    const response = yield call(editEvent, event);
    if (response instanceof Error) {
        yield put(eventsModule.editEventFailure(response));
        toast.error('Unable to edit game event information. Try again later.');
    } else {
        yield put(eventsModule.editEventSuccess(event));
        toast.success('Successfully updated game event information');
    }
    callback();
}

export default function* watchAddPlayer() {
    yield takeEvery(eventsModule.EDIT_EVENT, handleEditEvent);
}
