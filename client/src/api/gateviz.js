import axios from 'axios';

const getProductionPrefix = () =>
	process.env.NODE_ENV === 'production' ? 'http://api.gateviz.com' : '';

export const fetchCircuitList = async () =>
	await axios.get(`${getProductionPrefix()}/v1/circuit_list`);

export const fetchCircuitRequest = async cid =>
	await axios.get(`${getProductionPrefix()}/v1/circuit/${cid}`);
