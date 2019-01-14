import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { history } from '../../../setup';

import { getClient } from '../../../../utils/firebase';
import * as playerModule from '../index';

function deletePlayer(player) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Players/${player.id}`);
    return new Promise((resolve) => {
        ref.update(player, res => resolve(res));
    });
}

export function* handleDeletePlayer(action) {
    const player = action.payload;
    const inactivePlayer = { ...player, inactive: true };
    const response = yield call(deletePlayer, inactivePlayer);
    if (response instanceof Error) {
        yield put(playerModule.deletePlayerFailure(response));
        toast.success('Failed to delete player');
    } else {
        yield put(playerModule.deletePlayerSuccess(inactivePlayer));
        yield call(() => history.push('/players/menu'));
        toast.success('Successfully deleted player');
    }
}

export default function* watchDeletePlayer() {
    yield takeEvery(playerModule.DELETE_PLAYER, handleDeletePlayer);
}
