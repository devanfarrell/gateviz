import React, {ReactNode} from "react";
import { Provider } from "react-redux";
import { createStoreAbstraction } from "redux-dogma";
import {breadcrumbsSlice} from 'redux/slices/breadcrumbs'
import {circuitListSlice} from 'redux/slices/circuitList'
import circuitReducer, {key} from 'redux/circuit/reducer'
import circuitSaga from 'redux/circuit/saga'


export const store = createStoreAbstraction()
  .addUnmanagedRootSaga(circuitSaga)
  .addUnmanagedReducer(key, circuitReducer)
  .addSlice(breadcrumbsSlice)
  .addSlice(circuitListSlice)
  .lockSideEffects()
  .getStore();

interface ProviderInterface {
	children: ReactNode;
}

export default function ReduxProvider({ children }: ProviderInterface) {
  return <Provider store={store}>{children}</Provider>;
};