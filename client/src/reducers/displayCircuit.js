import { STEP_INTO_CIRCUIT } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		
		case STEP_INTO_CIRCUIT:
            // This is going to change what circuit is displayed from all available internal circuits
            // it could be really interesting to make a breadcrumb style navigation based on this.
			return  false;
		default:
			return state;
	}
}