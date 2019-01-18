import { CHANGE_SEARCH_TERM  } from '../types';

export default (state = null, action) => {
	switch (action.type) {
		
		case CHANGE_SEARCH_TERM:
			return action.payload || false;
		default:
			return state;
	}
}