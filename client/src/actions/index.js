import axios from 'axios';

import { FETCH_CIRCUIT, FETCH_CIRCUIT_LIST, CHANGE_SEARCH_TERM} from './types';

export const fetchCircuit = () => async dispatch => {
	const res = await axios.get('/api/circuit/test');
	dispatch({ type: FETCH_CIRCUIT, payload: res.data });
};

export const fetchCircuitList = () => async dispatch => {
	const res = await axios.get('/api/circuit_list');
	dispatch({ type: FETCH_CIRCUIT_LIST, payload: res.data.list });
};

export const changeSearchTerm = term => dispatch => {
	dispatch({ type: CHANGE_SEARCH_TERM, payload: term });
};