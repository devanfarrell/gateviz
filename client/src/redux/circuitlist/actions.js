import { generateAction } from 'redux/utils';

export const [FETCH_CIRCUIT_LIST_REQUEST, fetchCircuitListRequest] = generateAction(
	'CIRCUIT_LIST/FETCH_CIRCUIT_LIST_REQUEST'
);
export const [FETCH_CIRCUIT_LIST_SUCCESS, fetchCircuitListSuccess] = generateAction(
	'CIRCUIT_LIST/FETCH_CIRCUIT_LIST_SUCCESS'
);
