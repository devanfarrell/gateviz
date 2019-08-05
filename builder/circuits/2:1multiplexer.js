const Builder = require('../builder');
const gates = require('../gates');

module.exports = id =>
	new Builder(id)
		.addDescription('2:1 Multiplexer')
		.addPath('M48,10c0.008,-0.666 0,80 0,80l-34.793,9l0,-98l34.793,9Z', 40, 20)
		.addName('2:1 Multiplexer')
		// input a
		.addInput('a')
		.addLabel('A')
		.addCoord([50, 50])
		// input f
		.addInput('f')
		.addLabel('f')
		.addCoord([50, 100])
		// input b
		.addInput('b')
		.addLabel('B')
		.addCoord([50, 150])
		// not
		.addGate('not', gates.not)
		.addCoord([120, 70])
		.wireToInput('f')
		// and0
		.addGate('and0', gates.and)
		.addCoord([200, 50])
		.wireToInput('a')
		.wireToInput('not')
		// and1
		.addGate('and1', gates.and)
		.addCoord([200, 120])
		.wireToInput('f')
		.wireToInput('b')
		// or
		.addGate('or', gates.or)
		.addCoord([300, 80])
		.wireToInput('and0')
		.wireToInput('and1')
		// output
		.addOutput()
		.wireToInput('or')
		.addCoord([350, 100])
		.build();
