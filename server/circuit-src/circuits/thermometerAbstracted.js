const thermometer = require('./thermometer');

const Builder = require('../builder');
const inputIds = ['I1', 'I2', 'I3'];

const circuit = 'thermometer';

module.exports = id =>
	new Builder(id)
		.addDescription('A simple three input thermometer circuit')
		.addPath('M52.707,0.5l0,47l-52.207,0l0,-47l52.207,0Z', 50, 50)
		.addName('thermometer')
		//input A
		.addInput(inputIds[0])
		.addLabel('A')
		.addCoord([10, 200])
		//input B
		.addInput(inputIds[1])
		.addLabel('B')
		.addCoord([10, 300])
		//input C
		.addInput(inputIds[2])
		.addLabel('C')
		.addCoord([10, 400])
        .addCircuit(thermometer, circuit)


		// outputs
		.addOutput()
		.wireToInput(gateIds[2])
		.addCoord([450, 157.5])
		// 2
		.addOutput()
		.wireToInput(gateIds[3])
		.addCoord([450, 217.5])
		// 3
		.addOutput()
		.wireToInput(gateIds[4])
		.addCoord([450, 277.5])
		// 4
		.addOutput()
		.wireToInput(inputIds[2])
		.addCoord([450, 337.5])
		// 5
		.addOutput()
		.wireToInput(gateIds[5])
		.addCoord([450, 397.5])
		// 6
		.addOutput()
		.wireToInput(gateIds[6])
		.addCoord([450, 457.5])
		// 7
		.addOutput()
		.wireToInput(gateIds[7])
		.addCoord([450, 517.5])
		.build();