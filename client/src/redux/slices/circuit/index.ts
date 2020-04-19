import { createSlice } from "redux-dogma";
import { stateSlice } from "./state";
import { dependenciesSlice } from "./dependencies";

export const circuitSlice = createSlice("Circuit").addSlice(stateSlice).addSlice(dependenciesSlice);
