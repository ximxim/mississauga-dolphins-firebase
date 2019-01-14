import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as playersModule from '../index';

function editPlayer(player) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Players/${player.id}`);
    return new Promise((resolve) => {
        ref.update(player, res => resolve(res));
    });
}

export function* handleEditPlayer({ payload: { values, callback } }) {
    const player = values;
    const response = yield call(editPlayer, player);
    if (response instanceof Error) {
        yield put(playersModule.editPlayerFailure(response));
        toast.error('Unable to edit player information. Try again later.');
    } else {
        yield put(playersModule.editPlayerSuccess(player));
        toast.success('Successfully updated player information');
    }
    callback();
}

export default function* watchEditPlayer() {
    yield takeEvery(playersModule.EDIT_PLAYER, handleEditPlayer);
}
