import { FETCH_CIRCUIT, CHANGE_INPUTS } from '../actions/types';

import buildCircuit from '../engines/buildEngine';
import { evaluateCircuit } from '../engines/computationEngine';

export default function (state = null, action) {
	switch (action.type) {
		case FETCH_CIRCUIT:
			var temp = buildCircuit(action.payload);
			evaluateCircuit(temp);
			return temp || false;
		case CHANGE_INPUTS:
			temp = action.payload.circuit;
			for(var i = 0; i < action.payload.inputs.length; i++) {
				temp.input[i].output = action.payload.inputs[i];
			}
			evaluateCircuit(temp);
			return temp || false;
		default:
			return state;
	}
}