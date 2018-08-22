import svgjs from 'svgjs';
import { stepIntoCircuit } from '../actions/';
import { store } from '../';

const trueColor = '#00FF87';
const falseColor = '#464646';
const componentFillColor = '#D1D2D4';

function internalCircuitclickEvent(obj, id, name) {
	obj.click(() => {
		store.dispatch(stepIntoCircuit({id, name}));
	});
}

const INPUT = {
	path: 'M52.707,0.5l45.793,23.5l-45.793,23.5l-52.207,0l0,-47l52.207,0Z',
	height: 15,
	width: 35
};

const AND = {
	path:
		'M0.5,0.5l40,0l0.259,0.001c21.957,0.139 39.741,18.009 39.741,39.999c0,22.077 -17.923,40 -40,40l-40,0l0,-80Z',
	height: 50,
	width: 40
};

const NAND = {
	path:
		'M40.5,80.5l-40,0l0,-80l40.023,0.001c21.882,0.139 39.855,18.112 39.976,39.999c0.118,-2.103 1.862,-4 3.994,-4c2.208,0 4,1.792 4,4c0,2.208 -1.792,4 -4,4c-2.132,0 -3.876,-1.897 -3.994,-4c-0.122,21.973 -17.998,40 -39.999,40Z',
	height: 50,
	width: 45
};

const OR = {
	path:
		'M0.5,1.035c30.388,-3.915 65.492,14.114 76.793,39.465c-11.301,25.351 -46.405,43.38 -76.793,39.465l0.129,-0.018c16.963,-21.401 16.963,-57.493 0,-78.894l-0.129,-0.018Z',
	height: 50,
	width: 38.4
};

const NOR = {
	path:
		'M77.158,40.799c-11.443,25.194 -46.389,43.066 -76.658,39.166l0.129,-0.018c16.963,-21.401 16.963,-57.493 0,-78.894l-0.129,-0.018c30.269,-3.9 65.215,13.972 76.658,39.166c0.153,-2.068 1.882,-3.701 3.989,-3.701c2.208,0 4,1.792 4,4c0,2.208 -1.792,4 -4,4c-2.107,0 -3.836,-1.633 -3.989,-3.701Z',
	height: 50,
	width: 42.3
};

// XOR path is yet to be defined
const XOR = {
	path:
		'M0.5,1.035c30.388,-3.915 65.492,14.114 76.793,39.465c-11.301,25.351 -46.405,43.38 -76.793,39.465l0.129,-0.018c16.963,-21.401 16.963,-90.493 0,-78.894l-0.129,-0.018Z',
	height: 50,
	width: 40
};

const NOT = {
	path:
		'M46.193,23.949c0.028,-2.184 1.809,-3.949 4,-3.949c2.208,0 4,1.792 4,4c0,2.208 -1.792,4 -4,4c-2.191,0 -3.972,-1.765 -4,-3.949l-45.693,23.449l0,-47l45.693,23.449Z',
	height: 30,
	width: 30
};


export function initialize(ref) {
	return svgjs(ref).size(1000, 1000);
}

export function render(canvas, circuit, clickEvent) {
	//clear here saves a redundant function and really doesn't affect performance
	canvas.clear();
	//inputs
	for (var i = 0; i < circuit.input.length; i++) {
		var path = canvas.path(INPUT.path).move(circuit.input[i].coord[0], circuit.input[i].coord[1]);
		path.stroke({
			color: '#000',
			width: 2,
			linecap: 'round',
			linejoin: 'round'
		});
		path.size(INPUT.width, INPUT.height);
		if (circuit.input[i].output) {
			path.fill(trueColor);
		} else {
			path.fill(falseColor);
		}
	}

	// internal logic
	for (i = 0; i < circuit.internalLogic.length; i++) {
		var renderSpecs = {};
		switch (circuit.internalLogic[i].type) {
			case 'AND':
				renderSpecs = AND;
				break;
			case 'NAND':
				renderSpecs = NAND;
				break;
			case 'OR':
				renderSpecs = OR;
				break;
			case 'NOR':
				renderSpecs = NOR;
				break;
			case 'XOR':
				renderSpecs = XOR;
				break;
			case 'NOT':
				renderSpecs = NOT;
				break;
			default:
				renderSpecs.path = circuit.internalLogic[i].path;
				renderSpecs.height = circuit.internalLogic[i].height;
				renderSpecs.width = circuit.internalLogic[i].width;
		}

		path = canvas
			.path(renderSpecs.path)
			.move(circuit.internalLogic[i].coord[0], circuit.internalLogic[i].coord[1]);
		path.stroke({
			color: '#000',
			width: 2,
			linecap: 'round',
			linejoin: 'round'
		});
		path.size(renderSpecs.width, renderSpecs.height);



		if (circuit.internalLogic[i].type !== 'CIRCUIT') {

			if (circuit.internalLogic[i].output) {
				path.fill(trueColor);
			} else {
				path.fill(falseColor);
			}

		} else {
			circuit.internalLogic[i].localRef = path;
			internalCircuitclickEvent(circuit.internalLogic[i].localRef, circuit.internalLogic[i].id, circuit.internalLogic[i].name)
			path.fill(componentFillColor);
		}
	}

	//outputs
	for (i = 0; i < circuit.output.length; i++) {
		path = canvas.path(INPUT.path).move(circuit.output[i].coord[0], circuit.output[i].coord[1]);
		path.stroke({
			color: '#000',
			width: 2,
			linecap: 'round',
			linejoin: 'round'
		});
		path.size(INPUT.width, INPUT.height);
		if (circuit.output[i].output) {
			path.fill(trueColor);
		} else {
			path.fill(falseColor);
		}
	}
};
