import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as newsFeedModule from '../index';

function updateFeedItem(item) {
    const fClient = getClient();
    const ref = fClient.database().ref(`NewsFeed/${item.id}`);
    return new Promise(resolve => ref.update(item, res => resolve(res)));
}

export function* handleUpdate({ payload }) {
    const response = yield call(updateFeedItem, payload);
    if (response instanceof Error) {
        yield put(newsFeedModule.updateItemFailure(response));
        toast.error('Unable to update news item.');
    } else {
        yield put(newsFeedModule.updateItemSuccess(payload));
    }
}

export default function* watchUpdate() {
    yield takeEvery(newsFeedModule.UPDATE_FEED, handleUpdate);
}
