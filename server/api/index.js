import { circuitList_v1 } from './circuitList';
import { circuit_v1 } from './circuit';

const api = app => {
	circuitList_v1(app);
	circuit_v1(app);
};
export default api;
