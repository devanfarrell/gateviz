const Builder = require('../builder');
const multiplexer_2 = require('./2:1multiplexer');
const multiplexer_4 = require('./4:1multiplexer');
const adder = require('./fullAdder');
const gates = require('../gates');

module.exports = id =>
	new Builder(id)
		.addDescription('Arithmetic logic unit')
		.addPath('M48,10c0.008,-0.666 0,80 0,80l-34.793,9l0,-98l34.793,9Z', 100, 20)
		.addName('ALU')
		// input f
		.addBusInput('fBus', 3)
		.addLabel('f')
		.addCoord([50, 50])
		// input a
		.addInput('a')
		.addLabel('A')
		.addCoord([50, 350])
		// input b
		.addInput('b')
		.addLabel('B')
        .addCoord([50, 250])
        
        // Adder carry in
		.addInput('carryIn')
		.addLabel('Carry In')
		.addCoord([300, 275])

		.addGate('!b', gates.not)
		.wireToInput('b')
		.addCoord([100, 300])

		// input n - 1
		.addInput('nMinusOne')
		.addLabel('n - 1')
		.addCoord([500, 500])

		// mux 2
		.addCircuit(multiplexer_2, 'mux2')
		.wireToInput('b')
		.wireToInput('fBus', 2)
		.wireToInput('!b')
		.addCoord([200, 260])
		.addAxis([0.5, 1, 0.5])

        .addGate('A + B', gates.or)
        .addLabel('A + B')
		.wireToInput('mux2', 0)
		.wireToInput('a')
		.addCoord([300, 200])
		.addAxis([0.6, 0.9])

        .addGate('AB', gates.and)
        .addLabel('AB')
		.wireToInput('mux2', 0)
		.wireToInput('a')
		.addCoord([300, 100])
		.addAxis([0.6, 0.9])

		// full adder
        .addCircuit(adder, 'adder')
        .wireToInput('carryIn')
		.wireToInput('mux2', 0)
		.wireToInput('a')
        .addCoord([400, 275])
        .addAxis([0.5, 0.265, 0.615])

        // mux 2
        .addCircuit(multiplexer_4, 'mux4')
        .wireToInput('fBus', 0)
		.wireToInput('AB')
		.wireToInput('A + B')
        .wireToInput('adder', 0)
        .wireToInput('adder', 1)
		.addCoord([700, 100])
		.addAxis([1, 0.5, 0.5, 0.5, 0.5])

		.addOutput()
		.wireToInput('mux4', 0)
		.addCoord([750, 310])
		.addLabel('out')

		.addOutput()
		.wireToInput('adder', 0)
		.addLabel('n out')
		.addCoord([600, 750])

		.addOutput()
		.wireToInput('adder', 1)
		.addCoord([450, 750])
		.addLabel('carry out')

		.build();
