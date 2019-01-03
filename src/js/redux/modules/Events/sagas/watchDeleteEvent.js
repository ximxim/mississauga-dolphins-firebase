import {
    call,
    takeEvery,
    put,
    select,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { history } from '../../../setup';

import { getClient } from '../../../../utils/firebase';
import * as eventsModule from '../index';
import * as scoreModule from '../../Scores/index';
import { getScoresByGameId } from '../../../selectors';

function deleteEvent(eventId) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Events/${eventId}`);
    return ref.remove();
}

export function* handleDeleteEvent({ payload }) {
    const eventId = payload;
    const game = yield select(getScoresByGameId, eventId);
    yield put(scoreModule.deleteGame({ id: game.id, game }));
    yield call(deleteEvent, eventId);
    yield put(eventsModule.deleteEventSuccess(eventId));
    yield put(history.push('/games/menu'));
    toast.success('Successfully deleted game event');
}

export default function* watchAddPlayer() {
    yield takeEvery(eventsModule.DELETE_EVENT, handleDeleteEvent);
}
