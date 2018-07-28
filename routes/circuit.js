const circuitExample = require('../circuit-data/vq8ev7ga.json');
const circuitList = require('../circuit-data/list.json');



module.exports = app => {
	app.get(
		'/api/circuit/*',
		(req, res) => {
			require('url').parse(req.url)
			var str = req.url;
			const circuitRequested = str.replace("/api/load_circuit/", "")
			res.send(circuitExample);
			res.redirect(`/circuit/${circuitRequested}`);
		}
	);

	app.get(
		'/api/circuit_list',
		(req, res) => {
			res.send(circuitList);
		}
	);
};