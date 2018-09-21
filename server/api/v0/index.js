const circuitList = require('../../circuit-data/list.json');

/*
* There will need to eventually be a serialize circuit function.
* This function will need to parse a circuit and peice together it's internal circuits
* This will include assigning coordinates parsed from the parent circuit. 
* That will need to be a recursive function because an internal circuit is likely to have other dependances and internal circuits itself.
*
* It might be worthwhile to have a create circuit utility built prior to trying to hand impliment these internal parsing peices.
*/
module.exports = app => {
	app.get(
		'/api/circuit/*',
		(req, res) => {
			require('url').parse(req.url)
			var str = req.url;
			const circuitRequested = str.replace("/api/circuit/", "");
			if(require(`../../circuit-data/${circuitRequested}.json`)) {
				res.send(require(`../../circuit-data/${circuitRequested}.json`));
			} else {
				res.send(404);
			}
		}
	); 

	app.get(
		'/api/circuit_list',
		(req, res) => {
			res.send(circuitList);
		}
	);
};