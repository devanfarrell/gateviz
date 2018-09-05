// This reducer will keep track of where we are in the circuit by a push breadcrumb style
import { List } from 'immutable';
import { INIT_BREADCRUMB, STEP_INTO_CIRCUIT, STEP_BACK_BREADCRUMB } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case INIT_BREADCRUMB:
            const breadcrumb_init = List([{ name: action.payload, id: 'top' }]);
            return breadcrumb_init;
        case STEP_INTO_CIRCUIT:
            const breadcrumb_in = List([{ name: action.payload.name, id: action.payload.id }])
            const breadcrumb_out = state.concat(breadcrumb_in);
            return breadcrumb_out;
        case STEP_BACK_BREADCRUMB:
            console.log('step_back_breadcrumb', action.payload);
            return action.payload;
        default:
            return state;
    }
}