import { createSlice, createSelector, effects } from "redux-dogma";
import { fetchCircuitList } from "api/gateviz";

type TodoType = any;

interface CircuitDescription {}

interface ReducerStructure {
  list: CircuitDescription[];
}

export const circuitListSlice = createSlice<ReducerStructure>("CircuitList", { list: [] });

export const fetchCircuitListRequest = circuitListSlice.createSideEffect("FETCH_CIRCUIT_LIST_REQUEST", function* () {
  const request: TodoType = yield effects.call(fetchCircuitList);
  yield effects.put(fetchCircuitListSuccess(request.data.list));
});

export const fetchCircuitListSuccess = circuitListSlice.createAction<CircuitDescription[]>(
  "FETCH_CIRCUIT_LIST_SUCCESS",
  (draft, payload) => {
    draft.list = payload;
  }
);

const selectState = circuitListSlice.selectState();

export const selectCircuitList = createSelector<any, ReducerStructure, CircuitDescription[]>(
  selectState,
  (state) => state.list
);
