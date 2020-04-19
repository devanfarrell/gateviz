import { createSlice, effects } from "redux-dogma";

export const dependenciesSlice = createSlice<{}>("Dependencies", {});

// export const fetchCircuitRequest = dependenciesSlice.createSideEffect<string>('FETCH_CIRCUIT/REQUEST', function*() {
//         const { data } = yield fetchCircuitRequest(payload);
//         // const processedCircuit = yield processor(data);
//         // evaluateCircuit(processedCircuit);
//         // yield put(fetchCircuitSuccess({ response: data, parsedCircuit: processedCircuit }));

// })

const fetchCircuitRequest = dependenciesSlice.createSideEffect<string>("FETCH_CIRCUIT/REQUEST", function* (
  action
): any {
  yield effects.put({ type: "thing", payload: "boom" });
  const { data } = yield effects.call(fetchCircuitRequest, action.payload);
  // const { data } = yield fetchCircuitRequest(payload);
});
