const Builder = require('../builder');
const multiplexer = require('./2:1multiplexer');

module.exports = id =>
	new Builder(id)
		.addDescription('4:1 Multiplexer')
		.addPath('M48,10c0.008,-0.666 0,80 0,80l-34.793,9l0,-98l34.793,9Z', 100, 20)
		.addName('4:1 Multiplexer')
		// input f
		.addBusInput('fBus', 2)
		.addLabel('f')
		.addCoord([50, 200])
		// input a
		.addInput('a')
		.addLabel('A')
		.addCoord([150, 50])
		// input b
		.addInput('b')
		.addLabel('B')
		.addCoord([150, 150])
		// input c
		.addInput('c')
		.addLabel('C')
		.addCoord([150, 250])
		// input d
		.addInput('d')
		.addLabel('D')
		.addCoord([150, 350])

		.addCircuit(multiplexer, 'mux1')
		.wireToInput('a')
		.wireToInput('fBus', 0)
		.wireToInput('b')
        .addCoord([200, 90])
        .addAxis([0.5, 0.2, 0.5])

		.addCircuit(multiplexer, 'mux2')
		.wireToInput('c')
		.wireToInput('fBus', 0)
		.wireToInput('d')
        .addCoord([200, 290])
        .addAxis([0.5, 0.2, 0.5])

		.addCircuit(multiplexer, 'mux3')
		.wireToInput('mux1', 0)
		.wireToInput('fBus', 1)
		.wireToInput('mux2', 0)
		.addCoord([270, 190])
		// // output
		.addOutput()
		.wireToInput('mux3', 0)
		.addCoord([380, 210])

		.build();
