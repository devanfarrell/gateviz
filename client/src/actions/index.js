import axios from 'axios';
import { FETCH_CIRCUIT, FETCH_CIRCUIT_LIST, CHANGE_SEARCH_TERM, SELECT_CIRCUIT, STEP_INTO_CIRCUIT, CHANGE_INPUTS, DISPLAY_CIRCUIT, STEP_BACK_CIRCUIT, INIT_RENDER_ENGINE, INIT_BREADCRUMB, USE_RENDER_ENGINE } from './types';

export const fetchCircuit = cid => async dispatch => {
	const url = `/api/circuit/${cid}`;
	const res = await axios.get(url);
	dispatch({ type: FETCH_CIRCUIT, payload: res.data });
	//dispatch({ type: INIT_BREADCRUMB, payload: res.data });
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

export const stepIntoCircuit = obj => dispatch => {
	dispatch({ type: STEP_INTO_CIRCUIT, payload: obj });
	//dispatch({ type: DISPLAY_CIRCUIT, payload: obj });
};

export const stepBackCircuit = obj => dispatch => {
	dispatch({ type: STEP_BACK_CIRCUIT, payload: obj });
	dispatch({ type: DISPLAY_CIRCUIT, payload: obj });
};

export const changeInputs = obj => dispatch => {
	dispatch({ type: CHANGE_INPUTS, payload: obj });
	dispatch({ type: DISPLAY_CIRCUIT, payload: obj });
};

export const initRenderEngine = obj => dispatch => {
	dispatch({ type: INIT_RENDER_ENGINE, payload: obj });
};

export const renderCircuit = obj => dispatch => {
	dispatch({ type: USE_RENDER_ENGINE, payload: obj });
};