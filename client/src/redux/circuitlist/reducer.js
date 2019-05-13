import { fromJS } from 'immutable';
import { initializeName } from './actions';
import { actionTypes } from '../utils';

export const key = 'circuit-list';

// This reducer will keep track of where we are in the circuit by a push breadcrumb style
export default (state = fromJS([]), action) => {
	switch (action.type) {
		case initializeName(actionTypes.SUCCESS):
			return fromJS(action.payload);
		default:
			return state;
	}
};
