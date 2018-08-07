import { DISPLAY_CIRCUIT } from '../actions/types';
import { render } from '../engines/renderEngine';

export default function (state = null, action) {
	switch (action.type) {
		case DISPLAY_CIRCUIT:
			render(action.payload.canvas, action.payload.circuit);
			return state || false;

		default:
			return state;
	}
}