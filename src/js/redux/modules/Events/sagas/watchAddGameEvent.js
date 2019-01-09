import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as eventsModule from '../index';

function addGameEvent(event) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Events/${event.id}`);
    return new Promise((resolve) => {
        ref.set(event, res => resolve(res));
    });
}

export function* handleAddGameEvent({ payload: { values, callback } }) {
    const event = values;
    const response = yield call(addGameEvent, event);
    if (response instanceof Error) {
        yield put(eventsModule.addGameEventFailure(response));
        toast.error('Unable to add game event. Try again later.');
    } else {
        yield put(eventsModule.addGameEventSuccess(event));
        toast.success('Successfully added game event.');
    }
    callback();
}

export default function* watchAddGameEvent() {
    yield takeEvery(eventsModule.ADD_GAME_EVENT, handleAddGameEvent);
}
