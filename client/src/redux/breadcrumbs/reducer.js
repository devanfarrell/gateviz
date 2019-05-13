import { fromJS } from 'immutable';
import { initBreadcrumbName, stepBackName, stepIntoName } from './actions';

export const key = 'breadcrumbs';

// This reducer will keep track of where we are in the circuit by a push breadcrumb style
export default (state = fromJS([]), action) => {
	switch (action.type) {
		case initBreadcrumbName():
			return fromJS([{ name: action.payload, id: 'top', depth: 0 }]);
		case stepBackName():
			return state.setSize(action.payload.depth + 1);
		case stepIntoName():
			return state.push(
				fromJS({ name: action.payload.name, id: action.payload.id, depth: state.size })
			);
		default:
			return state;
	}
};
