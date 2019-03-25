const fs = require('fs');
const path = './circuit-data/';
const fileName = 'yoyoyo';
const thermometer = require('./thermometer')(fileName);
fs.writeFile(`${path}${fileName}.json`, JSON.stringify(thermometer), 'utf8', err => {
	if (err) throw err;
	console.log('The file has been saved!');
});
