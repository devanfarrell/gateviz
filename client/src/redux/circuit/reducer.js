import { fromJS } from 'immutable';
import { fetchCircuitName } from './actions';
import { actionTypes } from '../utils';

export const key = 'circuit';

// This reducer will keep track of where we are in the circuit by a push breadcrumb style
export default (state = fromJS({ response: {}, parsedCircuit: {} }), action) => {
	if (action.key === key) {
		const { response, parsedCircuit } = action.payload;
		switch (action.type) {
			case fetchCircuitName(actionTypes.SUCCESS):
				return state.setIn(['response'], fromJS(response));
			default:
				return state;
		}
	}
	return state;
};
