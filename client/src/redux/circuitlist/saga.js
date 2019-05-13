import { takeLatest, call, put } from 'redux-saga/effects';
import { initializeName } from './actions';
import { fetchCircuitList } from 'api/gateviz';
import { actionTypes } from '../utils';
import { initialize } from './actions';

function* fetchCircuitListSaga() {
	const list = yield call(fetchCircuitList);
	yield console.debug(list);
	yield put(initialize(actionTypes.SUCCESS, list.data.list));
}

export default function* circuitListSaga() {
	yield takeLatest(initializeName(actionTypes.REQUEST), fetchCircuitListSaga);
}
