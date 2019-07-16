import { FETCH_CIRCUIT_SUCCESS } from './actions';
import produce from 'immer';

export const key = 'circuit';

// This reducer will keep track of where we are in the circuit by a push breadcrumb style
export default produce(
	(draft, action) => {
		switch (action.type) {
			case FETCH_CIRCUIT_SUCCESS:
				const { response, parsedCircuit } = action.payload;
				draft.parsedCircuit = parsedCircuit;
				draft.response = response;
				return;
			default:
				return;
		}
	},
	{ response: {}, parsedCircuit: null }
);
