import { takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import {
	FETCH_CIRCUIT_REQUEST,
	fetchCircuitSuccess,
	CHANGE_INPUTS_REQUEST,
	changeInputsSuccess
} from './actions';
import { fetchCircuitRequest } from 'api/gateviz';
import processor from './processor';
import { selectAutoEvaluate } from './selectors';
import evaluateCircuit from './evaluateCircuit';

function* fetchCircuitHandler(action) {
	const { data } = yield fetchCircuitRequest(action.payload);
	const processedCircuit = yield processor(data);
	evaluateCircuit(processedCircuit);
	yield put(fetchCircuitSuccess({ response: data, parsedCircuit: processedCircuit }));
}

function* changeInputsHandler(action) {
	const { id, value, circuit } = action.payload;
	const index = circuit.input.findIndex(input => input.id === id);
	circuit.input[index].state = value;
	const autoEvaluate = yield select(selectAutoEvaluate);
	if (autoEvaluate) {
		evaluateCircuit(circuit);
	}
	yield put(
		changeInputsSuccess({
			input: circuit.input,
			parts: circuit.parts,
			output: circuit.output,
			name: circuit.name
		})
	);
}

export default function* saga() {
	yield takeLatest(FETCH_CIRCUIT_REQUEST, fetchCircuitHandler);
	yield takeEvery(CHANGE_INPUTS_REQUEST, changeInputsHandler);
}
