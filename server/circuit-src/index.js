const fs = require('fs');
const path = './circuit-data/';
const fileName = 'yoyoyo';
const thermometer = require('./circuits/thermometer')(fileName);

const fileNames = ['yoyoyo', 'yayaya'];
const circuits = [thermometer, thermometer];

const list = circuits.map((circuit, i) => {
	return {
		name: circuit.name,
		description: circuit.description,
		cid: fileNames[i]
	};
});

const listFile = {
	list: list
};

circuits.map((circuit, i) => {
	fs.writeFile(`${path}${fileNames[i]}.json`, JSON.stringify(circuit), 'utf8', err => {
		if (err) throw err;
		console.log(`${fileName} saved`);
	});
});

fs.writeFile(`${path}list2.json`, JSON.stringify(listFile), 'utf8', err => {
	if (err) throw err;
	console.log('The list has been saved!');
});
