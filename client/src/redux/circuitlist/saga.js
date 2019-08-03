import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_CIRCUIT_LIST_REQUEST, fetchCircuitListSuccess } from './actions';
import { fetchCircuitList } from 'api/gateviz';

function* fetchCircuitListHandler() {
	const request = yield call(fetchCircuitList);
	yield put(fetchCircuitListSuccess(request.data.list));
}

export default function* circuitListSaga() {
	yield takeLatest(FETCH_CIRCUIT_LIST_REQUEST, fetchCircuitListHandler);
}
