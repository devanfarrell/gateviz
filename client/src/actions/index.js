import axios from 'axios';
import { FETCH_CIRCUIT, FETCH_CIRCUIT_LIST, CHANGE_SEARCH_TERM, SELECT_CIRCUIT } from './types';

export const fetchCircuit = cid => async dispatch => {
	const url = `/api/circuit/${cid}`;
	const res = await axios.get(url);
	dispatch({ type: FETCH_CIRCUIT, payload: res.data });
};

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