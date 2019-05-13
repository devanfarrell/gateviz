import { SELECT_CIRCUIT  } from '../types';

export default (state = null, action) => {
	switch (action.type) {
		
		case SELECT_CIRCUIT:
			return action.payload || false;
		default:
			return state;
	}
}