import { SELECT_CIRCUIT  } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		
		case SELECT_CIRCUIT:
			return action.payload || false;
		default:
			return state;
	}
}