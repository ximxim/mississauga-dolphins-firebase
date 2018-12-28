import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as metaModule from '../index';

function getMeta() {
  const fClient = getClient();
  const ref = fClient.database().ref('/Meta');
  return new Promise(resolve => ref.once('value', snapshot => resolve(snapshot.val()), error => resolve(error)));
}

export function* handleRequest() {
  const response = yield call(getMeta);
  if (response.code) {
    yield put(metaModule.requestMetaFailure(response));
    toast.error(`META DATA: ${response.code}`);
  } else {
    yield put(metaModule.requestMetaSuccess(response));
  }
}

export default function* watchRequest() {
  yield takeEvery(metaModule.REQUEST_META, handleRequest);
}
