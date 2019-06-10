import { takeLatest, put } from 'redux-saga/effects';
import { FETCH_CIRCUIT_REQUEST, fetchCircuitSuccess } from './actions';
import { fetchCircuitRequest } from 'api/gateviz';
import processor from './processor';

function* fetchCircuitHandler(action) {
	const { data } = yield fetchCircuitRequest(action.payload);
	const processedCircuit = yield processor(data);
	yield put(fetchCircuitSuccess({ response: data, parsedCircuit: processedCircuit }));
}

export default function* saga() {
	yield takeLatest(FETCH_CIRCUIT_REQUEST, fetchCircuitHandler);
}
