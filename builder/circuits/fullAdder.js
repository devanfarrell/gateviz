const Builder = require('../builder');
const gates = require('../gates');

module.exports = id =>
	new Builder(id)
		.addDescription('A full adder with a carry in and out')
		.addPath(
			'M68,10c0.008,-0.666 0,40 0,40l-6.11,0l0,-5l0,5l-5,0l5,0l0,5l0,-5l6.11,0l0,40l-54.793,9l0,-42l39,-7l-39,-7l0,-42l54.793,9Z',
			40,
			20
		)
        .addName('Full Adder')
        
        // input carry
		.addInput('carry')
		.addLabel('carry in')
		.addCoord([10, 70])

		.addGate('!carry', gates.not)
		.addCoord([60, 100])
        .wireToInput('carry')
        
		// input a
		.addInput('a')
		.addLabel('A')
		.addCoord([10, 150])

		.addGate('!a', gates.not)
		.addCoord([60, 180])
		.wireToInput('a')

		// input b
		.addInput('b')
		.addLabel('B')
		.addCoord([10, 250])

		.addGate('!b', gates.not)
		.addCoord([60, 280])
		.wireToInput('b')

		// gates
		.addGate('and0', gates.and)
		.addCoord([300, 150])
		.wireToInput('a')
		.wireToInput('!b')
        .wireToInput('!carry')
        .addAxis([0.5, 0.3, 0.5])

		.addGate('and1', gates.and)
		.addCoord([300, 250])
		.wireToInput('!a')
		.wireToInput('b')
        .wireToInput('!carry')
        .addAxis([0.5, 0.3, 0.5])

		.addGate('and2', gates.and)
		.addCoord([300, 350])
		.wireToInput('!a')
		.wireToInput('!b')
        .wireToInput('carry')
        .addAxis([0.5, 0.3, 0.7])

		.addGate('and3', gates.and)
		.addCoord([300, 450])
		.wireToInput('a')
		.wireToInput('b')
        .wireToInput('carry')
        .addAxis([0.5, 0.3, 0.7])

		.addGate('and4', gates.and)
		.addCoord([300, 550])
		.wireToInput('carry')
        .wireToInput('a')
        .addAxis([0.7, 0.5])

		.addGate('and5', gates.and)
		.addCoord([300, 650])
		.wireToInput('carry')
        .wireToInput('b')
        .addAxis([0.7, 0.3])

		.addGate('and6', gates.and)
		.addCoord([300, 750])
		.wireToInput('a')
        .wireToInput('b')
        .addAxis([0.5, 0.3])

		.addGate('orSum', gates.or)
		.addCoord([400, 250])
		.wireToInput('and0')
		.wireToInput('and1')
		.wireToInput('and2')
        .wireToInput('and3')
        .addAxis([0.5, 0.5, 0.5, 0.66])

		.addGate('andCarryOut', gates.or)
		.addCoord([400, 650])
		.wireToInput('and4')
		.wireToInput('and5')
		.wireToInput('and6')

		// output
		.addOutput()
		.addLabel('out')
		.wireToInput('orSum')
		.addCoord([500, 250])

		.addOutput()
		.wireToInput('andCarryOut')
		.addLabel('carry out')
		.addCoord([500, 650])
		.build();
