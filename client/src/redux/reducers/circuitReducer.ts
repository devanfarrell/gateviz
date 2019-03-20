import { Map } from 'immutable';
import { CHANGE_INPUTS, FETCH_CIRCUIT } from '../types';

import buildCircuit from '../../engines/buildEngine';
import { evaluateCircuit } from '../../engines/computationEngine';

export default function (state = null, action) {
	switch (action.type) {
		case FETCH_CIRCUIT:
			let temp = buildCircuit(action.payload);
			evaluateCircuit(temp);
			const fetchedCircuit = Map({ input: temp.input, inputLength: temp.input.length, parts: temp.parts, output: temp.output, name: temp.name });
			return fetchedCircuit.toObject() || false;

		case CHANGE_INPUTS:
			temp = action.payload.circuit;
			for (let i = 0; i < action.payload.input.length; i++) {
				temp.input[i].output = action.payload.input[i];
			}
			evaluateCircuit(temp);
			const changedCircuit = Map({ input: temp.input, inputLength: temp.input.length, parts: temp.parts, output: temp.output, name: temp.name });
			return changedCircuit.toObject() || false;
		default:
			return state;
	}
}