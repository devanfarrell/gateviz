export const circuit_v1 = app => {
	app.get('/v1/circuit/*', (req, res) => {
		require('url').parse(req.url);
		const str = req.url;
		const circuitRequested = str.replace('/v1/circuit/', '');
		try {
			res.send(require(`../circuits_v1/${circuitRequested}.json`));
		} catch (e) {
			res.send(404);
		}
	});
};
import circuitList from '../data/circuitList.json';

export const circuitList_v1 = app => {
	app.get('/v1/circuit_list', (req, res) => {
		res.send(circuitList);
	});
};
import { circuitList_v1 } from './circuitList';
import { circuit_v1 } from './circuit';

const api = app => {
	circuitList_v1(app);
	circuit_v1(app);
};
export default api;
const circuitList = () => ({
	list: [{
		name: 'Thermometer',
		cid: 'vq8ev7ga',
		description: 'A simple three input thermometer circuit'
	}, {
		name: 'Thermometer abstracted',
		cid: 'vq8ev7ga2',
		description: 'A simple three input thermometer circuit'
	}, {
		name: 'Thermometer abstracted bus',
		cid: 'vq8ev7ga3',
		description: 'A simple three input thermometer circuit with a bus'
	}, {
		name: 'Gates Demo',
		cid: 'asdfasdfasdf',
		description: 'An example of gate functionality'
	}]
});

export default circuitList;
import express from 'express';
import bodyParser from 'body-parser';
import api from './api/index';

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

api(app);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
