import { takeLatest } from 'redux-saga/effects';
import { initializeAppName } from './actions';
import { fetchCircuitList } from 'api/gateviz';

function* fetchCircuitListSaga() {
	const list = yield fetchCircuitList();
	yield console.debug(list);
	// fetch circuit list
}

export default function* stateSaga() {
	yield takeLatest(initializeAppName, fetchCircuitListSaga);
}
