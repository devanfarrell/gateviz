import { createSlice } from "redux-dogma";

export const stateSlice = createSlice("State", {});


export const changeInputs = stateSlice.createAction<{id: string; value: boolean; circuit: any}>('CHANGE_INPUTS', (draft, payload) => {


}) 