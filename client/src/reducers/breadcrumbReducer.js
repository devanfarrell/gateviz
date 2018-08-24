// This reducer will keep track of where we are in the circuit by a push breadcrumb style
import { List } from 'immutable';
import { INIT_BREADCRUMB, STEP_INTO_CIRCUIT } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case INIT_BREADCRUMB:
            const breadcrumb_init = List([{ name: action.payload, id: 'top' }]);
            return breadcrumb_init;
        case STEP_INTO_CIRCUIT:
            const breadcrumb_in = List([{ name: action.payload.name, id: action.payload.id }])
            const breadcrumb_out = state.concat(breadcrumb_in);

            console.log('boop', breadcrumb_out)
            return breadcrumb_out;
        default:
            return state;
    }
}