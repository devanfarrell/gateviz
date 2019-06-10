import { fromJS } from 'immutable';
import { FETCH_CIRCUIT_LIST_SUCCESS } from './actions';

export const key = 'circuit-list';

export default (state = fromJS([]), action) => {
	switch (action.type) {
		case FETCH_CIRCUIT_LIST_SUCCESS:
			return fromJS(action.payload);
		default:
			return state;
	}
};
