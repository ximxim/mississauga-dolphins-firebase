import {
    takeEvery,
    call,
    put,
    select,
} from 'redux-saga/effects';
import _ from 'lodash';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as newsFeedModule from '../index';

function getNewsFeed(currentAmount) {
    const fClient = getClient();
    const page = 21;
    const amount = currentAmount ? currentAmount + page : page;
    return new Promise(resolve => fClient.database().ref('NewsFeed/')
        .orderByChild('date')
        .limitToLast(amount)
        .once('value', (snapshot) => {
            resolve(snapshot.val());
        }, (error) => {
            resolve(error);
        }));
}

export function* handleRequest() {
    const feedCount = yield select(state => _.size(state.newsfeed.feed));
    const response = yield call(getNewsFeed, feedCount);
    if (response.code) {
        yield put(newsFeedModule.requestFeedFailure(response));
        toast.error('Unable to fetch newsfeed.');
    } else {
        yield put(newsFeedModule.requestFeedSuccess(response));
    }
}

export default function* watchRequest() {
    yield takeEvery(newsFeedModule.REQUEST_FEED, handleRequest);
}
