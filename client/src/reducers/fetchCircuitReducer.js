import { FETCH_CIRCUIT } from '../actions/types';

import buildCircuit from '../engines/buildEngine';
import {evaluateCircuit} from '../engines/computationEngine';

export default function(state = null, action) {
	switch (action.type) {
		
		case FETCH_CIRCUIT:
			var temp = buildCircuit(action.payload);
			evaluateCircuit(temp);
			return temp || false;
		default:
			return state;
	}
}