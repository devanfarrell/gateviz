import { takeLatest, put } from 'redux-saga/effects';
import { fetchCircuitName, fetchCircuit } from './actions';
import { fetchCircuitRequest } from 'api/gateviz';
import processor from './processor';
import { actionTypes } from 'redux/utils';

function* fetchCircuitSaga(action) {
	const { data } = yield fetchCircuitRequest(action.payload);
    const processedCircuit = yield processor(data);
    console.debug(processedCircuit)
	yield put(fetchCircuit(actionTypes.SUCCESS, { response: data }));
}

export default function* saga() {
	yield takeLatest(fetchCircuitName(actionTypes.REQUEST), fetchCircuitSaga);
}
