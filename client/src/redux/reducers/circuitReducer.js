import { FETCH_CIRCUIT, CHANGE_INPUTS } from '../types';
import { Map } from 'immutable';

import buildCircuit from '../../engines/buildEngine';
import { evaluateCircuit } from '../../engines/computationEngine';

export default function (state = null, action) {
	switch (action.type) {
		case FETCH_CIRCUIT:
			var temp = buildCircuit(action.payload);
			for (var i = 0; i < temp.input.length; i++) {
				temp.input[i].output = 0;
			}
			evaluateCircuit(temp);
			const fetchedCircuit = Map({input: temp.input, inputLength: temp.input.length, internalLogic: temp.internalLogic, output: temp.output, name: temp.name});
			return fetchedCircuit.toObject() || false;

		case CHANGE_INPUTS:
			temp = action.payload.circuit;
			for (i = 0; i < action.payload.input.length; i++) {
				temp.input[i].output = action.payload.input[i];
			}
			evaluateCircuit(temp);
			const changedCircuit = Map({input: temp.input, inputLength: temp.input.length, internalLogic: temp.internalLogic, output: temp.output, name: temp.name});
			return changedCircuit.toObject() || false;
		default:
			return state;
	}
}