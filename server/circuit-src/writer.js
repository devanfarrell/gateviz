const fs = require('fs');
const destinationPath = './circuit-data/';
const originPath = './circuits/';

const circuits = [
	{
		destinationFile: 'doom',
		orginFile: 'thermometer'
	}
];

const list = circuits.map(circuitRef => {
	const circuit = require(`${originPath}${circuitRef.orginFile}`)(circuitRef.destinationFile);

	fs.writeFile(
		`${destinationPath}${circuitRef.destinationFile}.json`,
		JSON.stringify(circuit),
		'utf8',
		err => {
			if (err) throw err;
			console.log(`${circuit.name} saved`);
		}
	);

	return {
		name: circuit.name,
		description: circuit.description,
		cid: circuitRef.destinationFile
	};
});

const listFile = {
	list: list
};

fs.writeFile(`${destinationPath}list2.json`, JSON.stringify(listFile), 'utf8', err => {
	if (err) throw err;
	console.log('The list has been saved!');
});
