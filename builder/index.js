const fs = require('fs');
const destinationPath = '../server/src/circuits_v1/';
const originPath = './circuits/';

const circuits = [
	{
		destinationFileName: 'thermometer',
		orginFileName: 'thermometer'
	},
	{
		destinationFileName: 'thermometerAbstractedBus',
		orginFileName: 'thermometerAbstractedBus'
	},
	{
		destinationFileName: '2:1multiplexer',
		orginFileName: '2:1multiplexer'
	},
	{
		destinationFileName: '4:1multiplexer',
		orginFileName: '4:1multiplexer'
	},
	{
		destinationFileName: 'fullAdder',
		orginFileName: 'fullAdder'
	}
];

const list = circuits.map(circuitNames => {
	const circuit = require(`${originPath}${circuitNames.orginFileName}`)(
		circuitNames.destinationFileName
	);
	fs.writeFile(
		`${destinationPath}${circuitNames.destinationFileName}.json`,
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
		cid: circuitNames.destinationFileName
	};
});

const listFile = {
	list
};

fs.writeFile('../server/src/data/circuitList.json', JSON.stringify(listFile), 'utf8', err => {
	if (err) throw err;
	console.log('The list has been saved!');
});
