import { fromJS } from 'immutable';
import { FETCH_CIRCUIT_SUCCESS } from './actions';
import { actionTypes } from '../utils';

export const key = 'circuit';

// This reducer will keep track of where we are in the circuit by a push breadcrumb style
export default (state = fromJS({ response: {}, parsedCircuit: null }), action) => {
	let s = state;
	switch (action.type) {
		case FETCH_CIRCUIT_SUCCESS: {
			const { response, parsedCircuit } = action.payload;
			s = state.setIn(['parsedCircuit'], fromJS(parsedCircuit));
			return s.setIn(['response'], fromJS(response));
		}
		default:
			return state;
	}
};
