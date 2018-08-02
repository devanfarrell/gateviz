import { FETCH_CIRCUIT } from '../actions/types';

import buildCircuit from '../engines/buildEngine';
import {evaluateCircuit} from '../engines/computationEngine';

export default function(state = null, action) {
	switch (action.type) {
		
		case FETCH_CIRCUIT:
			var temp = buildCircuit(action.payload);
			temp.input[0].output = true;
			temp.input[1].output = true;
			temp.input[2].output = true;
			evaluateCircuit(temp);
			console.log(temp);
			return temp || false;
		default:
			return state;
	}
}