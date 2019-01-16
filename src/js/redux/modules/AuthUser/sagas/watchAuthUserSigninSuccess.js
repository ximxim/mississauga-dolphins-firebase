import { takeEvery, put } from 'redux-saga/effects';

import * as authUserModule from '../index';
import * as scoresModule from '../../Scores';
import * as eventsModule from '../../Events';
import * as playersModule from '../../Players';
import * as newsfeedModule from '../../NewsFeed';

export function* handleLoginSuccess() {
    yield put(newsfeedModule.requestFeed());
    yield put(eventsModule.requestEvents());
    yield put(scoresModule.requestGames());
    yield put(playersModule.requestPlayers());
}

export default function* watchRequest() {
    yield takeEvery(authUserModule.REQUEST_LOGIN_SUCCESS, handleLoginSuccess);
}
