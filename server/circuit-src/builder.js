const inputs = {
	single: 'SINGLE_INPUT',
	multiple: 'MULTIPLE_INPUT'
};

const outputs = {
	single: 'SINGLE_OUTPUT',
	multiple: 'MULTIPLE_OUTPUT'
};

class Builder {
	constructor(cid) {
		this.cid = cid;
		this.input = [];
		this.parts = [];
		this.outputs = [];
		this.lastPiece = this;
	}

	addDescription(text) {
		this.description = text;
		return this;
	}

	addName(name) {
		this.name = name;
		return this;
	}

	addPath(path, height, width) {
		this.path = path;
		this.height = height;
		this.width = width;
		return this;
	}

	addInput(id) {
		const input = { id: id, type: inputs.single };
		this.input.push(input);
		this.lastPiece = this.input[this.input.length - 1];
		return this;
	}

	addBusInput(id, size) {
		const input = { id: id, type: inputs.multiple, size: size };
		this.input.push(input);
		this.lastPiece = this.input[this.input.length - 1];
		return this;
	}

	addGate(id, type) {
		const gate = { id: id, type: type, input: [] };
		this.parts.push(gate);
		this.lastPiece = this.parts[this.parts.length - 1];
		return this;
	}

	addCircuit() {
		//TODO
	}

	addOutput() {
		const output = { type: outputs.single, input: [] };
		this.outputs.push(output);
		this.lastPiece = this.outputs[this.outputs.length - 1];
		return this;
	}

	addBusOutput() {
		const output = { type: outputs.multiple };
		this.outputs.push(output);
		this.lastPiece = this.outputs[this.outputs.length - 1];
		return this;
	}

	addCoord(coords) {
		this.lastPiece.coord = coords;
		return this;
	}

	addLabel(label) {
		this.lastPiece.label = label;
		return this;
	}

	addAxis(axis) {
		this.lastPiece.axis = axis;
		return this;
	}

	wireToInput(input, optionalPin) {
		const selectedInput = !optionalPin ? input : `${input}:${optionalPin}`;
		if (this.lastPiece.type === outputs.single) {
			this.lastPiece.input = selectedInput;
		} else {
			this.lastPiece.input.push(selectedInput);
		}
		return this;
	}

	build() {
		return {
			cid: this.cid,
			name: this.name ? this.name : undefined,
			path: this.path ? this.path : undefined,
			description: this.description ? this.description : undefined,
			input: this.input,
			parts: this.parts,
			output: this.outputs
		};
	}
}

module.exports = Builder;
