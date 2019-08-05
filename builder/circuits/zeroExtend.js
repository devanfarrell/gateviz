const Builder = require('../builder');
const gates = require('../gates');

module.exports = id =>
	new Builder(id)
		.addDescription('A simple three input thermometer circuit')
		.addPath('M51.293,0.509c0.008,-0.666 0,36 0,36l-50.793,0l0,-15l50.793,-21Z', 20, 30)
		.addName('Zero Extender')
		.addInput('I')
		.addLabel('A')
		.addCoord([50, 50])
		.addGate('not', gates.not)
		.addCoord([100, 100])
		.wireToInput('I')
		.addGate('and', gates.and)
		.addCoord([150, 50])
		.wireToInput('I')
		.wireToInput('not')
		.addOutput()
		.wireToInput('and')
		.addCoord([200, 60])
		.build();
