type circuitId = string;
type svgPath = string;
type internalInputId = string | number;
type internalPartId = string | number;
type coord = [number, number]; // [x, y]

export enum InputType {
  single = 'SINGLE_INPUT',
  multi = 'MULTIPLE_INPUT',
}

export enum PartType {
  circuit = 'CIRCUIT',
  or = 'OR',
  and = 'AND',
  nand = 'NAND',
  nor = 'NOR',
  not = 'NOT',
}

export enum OutputType {
  single = 'SINGLE_OUTPUT',
  multi = 'MULTIPLE_OUTPUT',
}

export interface InternalInput {
  id: internalInputId;
  type: InputType;
  label?: string;
  coord: coord;
}

export interface InternalPart {
  id: internalPartId;
  type: PartType;
  coord: coord;
  input: Array<internalInputId | internalPartId>;
  label?: string;
  circuitId?: circuitId;
}

export interface ComposedInternalPart extends InternalPart {
  circuit?: ComposedCircuit;
}

export interface InternalOutput {
  id: internalInputId;
  type: OutputType;
  label?: string;
  input: Array<internalInputId | internalPartId>;
  coord: coord;
}

interface ExtensibleCircuitPartDefinition {
  cid: circuitId;
  name: string;
  description: string;
  path: svgPath;
  height: number;
  width: number;
  input: InternalInput[];
  parts: Array<InternalPart | ComposedInternalPart>;
  output: InternalOutput[];
}

export interface CircuitPartDefinition extends ExtensibleCircuitPartDefinition {
  parts: InternalPart[];
}

export interface ComposedCircuit extends ExtensibleCircuitPartDefinition {
  parts: ComposedInternalPart[];
}

export interface CompiledCircuit {}
