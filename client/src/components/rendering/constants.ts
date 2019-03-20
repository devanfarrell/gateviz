export const trueColor = '#00FF87';
export const falseColor = '#464646';
export const componentFillColor = '#D1D2D4';

interface PartDrawing {
    height: number;
    path: string;
    width: number;
}

const INPUT: PartDrawing = {
    height: 15,
    path: 'M52.707,0.5l45.793,23.5l-45.793,23.5l-52.207,0l0,-47l52.207,0Z',
    width: 35
};

const AND: PartDrawing = {
    height: 50,
    path:
        'M0.5,0.5l40,0l0.259,0.001c21.957,0.139 39.741,18.009 39.741,39.999c0,22.077 -17.923,40 -40,40l-40,0l0,-80Z',
    width: 40
};

const NAND: PartDrawing = {
    height: 50,
    path:
        'M40.5,80.5l-40,0l0,-80l40.023,0.001c21.882,0.139 39.855,18.112 39.976,39.999c0.118,-2.103 1.862,-4 3.994,-4c2.208,0 4,1.792 4,4c0,2.208 -1.792,4 -4,4c-2.132,0 -3.876,-1.897 -3.994,-4c-0.122,21.973 -17.998,40 -39.999,40Z',
    width: 45
};

const OR: PartDrawing = {
    height: 50,
    path:
        'M0.5,1.035c30.388,-3.915 65.492,14.114 76.793,39.465c-11.301,25.351 -46.405,43.38 -76.793,39.465l0.129,-0.018c16.963,-21.401 16.963,-57.493 0,-78.894l-0.129,-0.018Z',
    width: 38.4
};

const NOR: PartDrawing = {
    height: 50,
    path:
        'M77.158,40.799c-11.443,25.194 -46.389,43.066 -76.658,39.166l0.129,-0.018c16.963,-21.401 16.963,-57.493 0,-78.894l-0.129,-0.018c30.269,-3.9 65.215,13.972 76.658,39.166c0.153,-2.068 1.882,-3.701 3.989,-3.701c2.208,0 4,1.792 4,4c0,2.208 -1.792,4 -4,4c-2.107,0 -3.836,-1.633 -3.989,-3.701Z',
    width: 42.3
};

// XOR path is yet to be defined
const XOR: PartDrawing = {
    height: 50,
    path:
        'M0.5,1.035c30.388,-3.915 65.492,14.114 76.793,39.465c-11.301,25.351 -46.405,43.38 -76.793,39.465l0.129,-0.018c16.963,-21.401 16.963,-90.493 0,-78.894l-0.129,-0.018Z',
    width: 40
};

const NOT: PartDrawing = {
    height: 30,
    path:
        'M46.193,23.949c0.028,-2.184 1.809,-3.949 4,-3.949c2.208,0 4,1.792 4,4c0,2.208 -1.792,4 -4,4c-2.191,0 -3.972,-1.765 -4,-3.949l-45.693,23.449l0,-47l45.693,23.449Z',
    width: 30
};


export const SINGLE_INPUT_TYPE = 'SINGLE_INPUT';
export const MULTIPLE_INPUT_TYPE = 'MULTIPLE_INPUT';
export const SINGLE_OUTPUT_TYPE = 'SINGLE_OUTPUT';
export const MULTIPLE_OUTPUT_TYPE = "MULTIPLE_OUTPUT";
export const AND_TYPE = 'AND';
export const NAND_TYPE = 'NAND';
export const OR_TYPE = 'OR';
export const NOR_TYPE = 'NOR';
export const XOR_TYPE = 'XOR';
export const NOT_TYPE = 'NOT';



export const getTypeData = (type) : PartDrawing | null => {
    switch (type) {
        case SINGLE_INPUT_TYPE: return INPUT;
        case MULTIPLE_INPUT_TYPE: return INPUT;
        case SINGLE_OUTPUT_TYPE: return INPUT;
        case AND_TYPE: return AND;
        case NAND_TYPE: return NAND;
        case OR_TYPE: return OR;
        case NOR_TYPE: return NOR;
        case XOR_TYPE: return XOR;
        case NOT_TYPE: return NOT;
        default: return null;
    }
}