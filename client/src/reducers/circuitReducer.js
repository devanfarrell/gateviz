import { FETCH_CIRCUIT } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
        case FETCH_CIRCUIT:
            console.log(action.payload);
			return action.payload || false;
		default:
			return state;
	}
}