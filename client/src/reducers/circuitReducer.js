import { FETCH_CIRCUIT, CHANGE_INPUTS } from '../actions/types';

import buildCircuit from '../engines/buildEngine';
import { evaluateCircuit } from '../engines/computationEngine';

export default function (state = null, action) {
	switch (action.type) {
		case FETCH_CIRCUIT:
			var temp = buildCircuit(action.payload);
			for (var i = 0; i < temp.input.length; i++) {
				temp.input[i].output = 0;
			}
			evaluateCircuit(temp);
			return temp || false;

		case CHANGE_INPUTS:
			console.log('hello evaluate button!')
			temp = action.payload.circuit;
			for (i = 0; i < action.payload.input.length; i++) {
				temp.input[i].output = action.payload.input[i];
			}
			evaluateCircuit(temp);
			return temp || false;
		default:
			return state;
	}
}