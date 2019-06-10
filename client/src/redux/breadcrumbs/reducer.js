import { fromJS } from 'immutable';
import { INIT_BREADCRUMB, STEP_INTO_CIRCUIT, STEP_BACK } from './actions';

export const key = 'breadcrumbs';

// This reducer will keep track of where we are in the circuit by a push breadcrumb style
export default (state = fromJS([]), action) => {
	switch (action.type) {
		case INIT_BREADCRUMB:
			return fromJS([{ name: action.payload, id: 'top', depth: 0 }]);
		case STEP_BACK:
			return state.setSize(action.payload.depth + 1);
		case STEP_INTO_CIRCUIT:
			return state.push(
				fromJS({ name: action.payload.name, id: action.payload.id, depth: state.size })
			);
		default:
			return state;
	}
};
