import { FETCH_CIRCUIT_LIST_SUCCESS } from './actions';
import produce from 'immer';
export const key = 'circuit-list';

export default produce((draft, action) => {
	switch (action.type) {
		case FETCH_CIRCUIT_LIST_SUCCESS:
			draft = action.payload;
			return;
		default:
			return;
	}
}, []);
