const circuitExample = require('../circuit-data/vq8ev7ga.json');
const circuitList = require('../circuit-data/list.json');



module.exports = app => {
	app.get(
		'/api/circuit/*',
		(req, res) => {
			require('url').parse(req.url)
			var str = req.url;
			const circuitRequested = str.replace("/api/circuit/", "")
			console.log(circuitRequested)
			res.send(circuitExample);
		}
	);

	app.get(
		'/api/circuit_redirect',
		(req, res) => {
			console.log(req);
			res.redirect('/circuit/yay');
		}
	);

	app.get(
		'/api/circuit_list',
		(req, res) => {
			res.send(circuitList);
		}
	);
};