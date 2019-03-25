const Builder = require('./builder');
const gates = require('./gates');

const inputIds = ['I1', 'I2', 'I3'];
const gateIds = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8'];

module.exports = id => new Builder(id)
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
	//parts
	// a + b
	.addGate(gateIds[0], gates.or)
	.addCoord([150, 247.5])
	.addLabel('a + b')
	.wireToInput(inputIds[0])
	.wireToInput(inputIds[1])
	// ab
	.addGate(gateIds[1], gates.and)
	.addCoord([150, 160])
	.addLabel('ab')
	.wireToInput(inputIds[0])
	.wireToInput(inputIds[1])
	// a + b + c
	.addGate(gateIds[2], gates.or)
	.addCoord([350, 140])
	.wireToInput(gateIds[0])
	.wireToInput(inputIds[2])
	// b + c
	.addGate(gateIds[3], gates.or)
	.addCoord([350, 200])
	.wireToInput(inputIds[1])
	.wireToInput(inputIds[2])
	// ab + c
	.addGate(gateIds[4], gates.or)
	.addCoord([350, 260])
	.wireToInput(gateIds[1])
	.wireToInput(inputIds[2])
	// (a+b)c
	.addGate(gateIds[5], gates.and)
	.addCoord([350, 380])
	.wireToInput(gateIds[0])
	.wireToInput(inputIds[2])
	// bc
	.addGate(gateIds[6], gates.and)
	.addCoord([350, 440])
	.wireToInput(inputIds[1])
	.wireToInput(inputIds[2])
	// abc
	.addGate(gateIds[7], gates.and)
	.addCoord([350, 500])
	.wireToInput(gateIds[1])
	.wireToInput(inputIds[2])
	// outputs
	.addOutput()
	.wireToInput(gateIds[2])
	.addCoord([450, 157.5])
	.addOutput()
	.wireToInput(gateIds[3])
	.addCoord([450, 217.5])
	.addOutput()
	.wireToInput(gateIds[4])
	.addCoord([450, 277.5])
	.addOutput()
	.wireToInput(inputIds[2])
	.addCoord([450, 337.5])
	.addOutput()
	.wireToInput(gateIds[5])
	.addCoord([450, 397.5])
	.addOutput()
	.wireToInput(gateIds[6])
	.addCoord([450, 457.5])
	.addOutput()
	.wireToInput(gateIds[7])
	.addCoord([450, 517.5])
	.build();
