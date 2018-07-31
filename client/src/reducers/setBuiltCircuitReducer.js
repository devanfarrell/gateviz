import { SET_BUILT_CIRCUIT  } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		
		case SET_BUILT_CIRCUIT:
			return action.payload || false;
		default:
			return state;
	}
}