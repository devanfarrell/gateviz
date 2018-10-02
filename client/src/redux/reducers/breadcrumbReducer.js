// This reducer will keep track of where we are in the circuit by a push breadcrumb style
import { List } from 'immutable';
import { INIT_BREADCRUMB, STEP_INTO_CIRCUIT, STEP_BACK_BREADCRUMB } from '../types';

export default function (state = null, action) {
    switch (action.type) {
        case INIT_BREADCRUMB:
            const breadcrumbInit = List([{ name: action.payload, id: 'top', depth: 0 }]);
            return breadcrumbInit;
        case STEP_BACK_BREADCRUMB:
            const breadcrumbShortened = state.setSize(action.payload.depth + 1);
            return breadcrumbShortened;
        case STEP_INTO_CIRCUIT:
            const breadcrumbIn = List([{ name: action.payload.name, id: action.payload.id, depth: state.size }])
            const breadcrumbOut = state.concat(breadcrumbIn);
            return breadcrumbOut;
        default:
            return state;
    }
}