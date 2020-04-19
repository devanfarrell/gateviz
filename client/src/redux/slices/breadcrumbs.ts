import { createSlice, createSelector } from "redux-dogma";

interface Crumb {
  name: string;
  id: string;
  depth: number;
}

interface ReducerStructure {
  crumbs: Crumb[];
}

export const breadcrumbsSlice = createSlice<ReducerStructure>("Breadcrumbs", { crumbs: [] });

export const initBreadcrumb = breadcrumbsSlice.createAction<string>("INIT_BREADCRUMB", (draft, name) => {
  draft.crumbs.push({ name, id: "top", depth: 0 });
});

export const stepIntoCircuit = breadcrumbsSlice.createAction<{ name: string; id: string }>(
  "STEP_INTO_CIRCUIT",
  (draft, payload) => {
    draft.crumbs.push({ ...payload, depth: draft.crumbs.length });
  }
);

export const stepBack = breadcrumbsSlice.createAction<number>("STEP_BACK", (draft, newDepth) => {
  draft.crumbs.length = newDepth;
});

const reducerSelector = breadcrumbsSlice.selectState();

export const selectBreadcrumbs = createSelector<any, ReducerStructure, Crumb[]>(
  reducerSelector,
  (state) => state.crumbs
);
