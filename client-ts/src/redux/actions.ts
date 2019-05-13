import axios from 'axios';
import {
	CHANGE_INPUTS,
	CHANGE_SEARCH_TERM,
	FETCH_CIRCUIT,
	FETCH_CIRCUIT_LIST,
	INIT_BREADCRUMB,
	SELECT_CIRCUIT,
	STEP_BACK_BREADCRUMB,
	STEP_INTO_CIRCUIT
} from './types';

// Landing reducers
export const fetchCircuitList = () => async dispatch => {
	const res = await axios.get('/v1/circuits');
	dispatch({ type: FETCH_CIRCUIT_LIST, payload: res.data.list });
};

export const changeSearchTerm = term => dispatch => {
	dispatch({ type: CHANGE_SEARCH_TERM, payload: term });
};

export const selectCircuit = circuitKey => dispatch => {
	dispatch({ type: SELECT_CIRCUIT, payload: circuitKey });
};

// circuitReducer
export const fetchCircuit = cid => async dispatch => {
	const url = `/v1/circuit/${cid}`;
	const res = await axios.get(url);
	dispatch({ type: FETCH_CIRCUIT, payload: res.data });
};

export const changeInputs = obj => dispatch => {
	dispatch({ type: CHANGE_INPUTS, payload: obj });
};

// breadcrumbsReducer
export const initBreadcrumb = name => dispatch => {
	dispatch({ type: INIT_BREADCRUMB, payload: name });
}

export const stepIntoCircuit = obj => dispatch => {
	dispatch({ type: STEP_INTO_CIRCUIT, payload: obj });
};

export const stepBackBreadcrumb = clickedBreadcrumb => dispatch => {
	dispatch({ type: STEP_BACK_BREADCRUMB, payload: clickedBreadcrumb });
};