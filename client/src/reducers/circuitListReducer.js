import { FETCH_CIRCUIT_LIST  } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
        case FETCH_CIRCUIT_LIST:
			return action.payload || false;
		default:
			return state;
	}
}