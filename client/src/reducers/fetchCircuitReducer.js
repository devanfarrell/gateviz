import { FETCH_CIRCUIT } from '../actions/types';

import buildCircuit from '../engines/buildEngine';

export default function(state = null, action) {
	switch (action.type) {
		
		case FETCH_CIRCUIT:
			var temp = buildCircuit(action.payload)
			return temp || false;
		default:
			return state;
	}
}