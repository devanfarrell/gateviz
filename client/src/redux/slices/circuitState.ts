import { generateAction } from '../utils';

export const [FETCH_CIRCUIT_REQUEST, fetchCircuitRequest] = generateAction('CIRCUIT/FETCH_CIRCUIT/REQUEST');
export const [FETCH_CIRCUIT_SUCCESS, fetchCircuitSuccess] = generateAction('CIRCUIT/FETCH_CIRCUIT/SUCCESS');

export const [CHANGE_INPUTS, changeInputs] = generateAction('CIRCUIT/CHANGE_INPUTS');
export const [CHANGE_INPUTS_REQUEST, changeInputsRequest] = generateAction('CIRCUIT/CHANGE_INPUTS/REQUEST');
export const [CHANGE_INPUTS_SUCCESS, changeInputsSuccess] = generateAction('CIRCUIT/CHANGE_INPUTS/SUCCESS');