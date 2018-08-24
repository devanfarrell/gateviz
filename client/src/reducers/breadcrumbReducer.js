// This reducer will keep track of where we are in the circuit by a push breadcrumb style

import { INIT_BREADCRUMB, STEP_INTO_CIRCUIT } from '../actions/types';
export default function (state = null, action) {
    switch (action.type) {
        case INIT_BREADCRUMB:
            var breadcrumb = [{ name: action.payload, id: 'top' }];
            return breadcrumb;
        case STEP_INTO_CIRCUIT:
            state.push(action.payload);
            return state;
        default:
            return state;
    }
}