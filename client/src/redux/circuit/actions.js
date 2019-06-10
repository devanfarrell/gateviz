import { generateAction } from '../utils';

export const [FETCH_CIRCUIT_REQUEST, fetchCircuitRequest] = generateAction('CIRCUIT/FETCH_CIRCUIT_REQUEST');
export const [FETCH_CIRCUIT_SUCCESS, fetchCircuitSuccess] = generateAction('CIRCUIT/FETCH_CIRCUIT_SUCCESS');