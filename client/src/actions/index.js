import axios from 'axios';
import {
	FETCH_CIRCUIT_LIST,
	CHANGE_SEARCH_TERM,
	SELECT_CIRCUIT,

	FETCH_CIRCUIT,
	CHANGE_INPUTS,

	INIT_BREADCRUMB,
	STEP_INTO_CIRCUIT,
	STEP_BACK_BREADCRUMB } from './types';

//Landing reducers
export const fetchCircuitList = () => async dispatch => {
	const res = await axios.get('/api/circuit_list');
	dispatch({ type: FETCH_CIRCUIT_LIST, payload: res.data.list });
};

export const changeSearchTerm = term => dispatch => {
	dispatch({ type: CHANGE_SEARCH_TERM, payload: term });
};

export const selectCircuit = circuitKey => dispatch => {
	dispatch({ type: SELECT_CIRCUIT, payload: circuitKey });
};

//circuitReducer
export const fetchCircuit = cid => async dispatch => {
	const url = `/api/circuit/${cid}`;
	const res = await axios.get(url);
	dispatch({ type: FETCH_CIRCUIT, payload: res.data });
};

export const changeInputs = obj => dispatch => {
	dispatch({ type: CHANGE_INPUTS, payload: obj });
};

//breadcrumbsReducer
export const initBreadcrumb = name => dispatch => {
	dispatch({ type: INIT_BREADCRUMB, payload: name });
}

export const stepIntoCircuit = obj => dispatch => {
	dispatch({ type: STEP_INTO_CIRCUIT, payload: obj });
};

export const stepBackBreadcrumb = clickedBreadcrumb => dispatch => {
	dispatch({ type: STEP_BACK_BREADCRUMB, payload: clickedBreadcrumb });
};