import {
    call, takeEvery, put, select,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as playersModule from '../index';
import { history } from '../../../setup';

function addPlayer(player) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Players/${player.id}`);
    return new Promise((resolve) => {
        ref.set(player, res => resolve(res));
    });
}

export function* handleAddPlayer({ payload: { values, callback } }) {
    let player = values;
    const allPlayers = yield select(state => state.players.items);
    player = {
        ...player,
        id: allPlayers.length,
    };
    const response = yield call(addPlayer, player);
    if (response instanceof Error) {
        yield put(playersModule.addPlayerFailure(response));
        toast.error('Unable to add player. Try again later.');
    } else {
        toast.success('Successfully added player');
        yield put(playersModule.addPlayerSuccess(player));
        yield call(history.push(`/players/${player.id}`));
    }
    callback();
}

export default function* watchAddPlayer() {
    yield takeEvery(playersModule.ADD_PLAYER, handleAddPlayer);
}
