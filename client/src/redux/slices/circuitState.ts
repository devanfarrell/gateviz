import { createAction } from "redux-dogma";

export const [FETCH_CIRCUIT_REQUEST, fetchCircuitRequest] = createAction("CIRCUIT/FETCH_CIRCUIT/REQUEST");
export const [FETCH_CIRCUIT_SUCCESS, fetchCircuitSuccess] = createAction("CIRCUIT/FETCH_CIRCUIT/SUCCESS");

export const [CHANGE_INPUTS, changeInputs] = createAction("CIRCUIT/CHANGE_INPUTS");
export const [CHANGE_INPUTS_REQUEST, changeInputsRequest] = createAction("CIRCUIT/CHANGE_INPUTS/REQUEST");
export const [CHANGE_INPUTS_SUCCESS, changeInputsSuccess] = createAction("CIRCUIT/CHANGE_INPUTS/SUCCESS");
