import { FETCH_CIRCUIT_SUCCESS, CHANGE_INPUTS_SUCCESS } from './actions';
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
			case CHANGE_INPUTS_SUCCESS:
				const circuit = action.payload;
				draft.parsedCircuit = circuit;
				if (draft.autoEvaluate) {
					draft.displayedCircuit = circuit;
				}
				return;
			default:
				return;
		}
	},
	{ response: {}, parsedCircuit: null, autoEvaluate: true, displayedCircuit: null }
);
