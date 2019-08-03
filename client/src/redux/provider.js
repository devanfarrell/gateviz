import React from 'react';
import ReduxSaga from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const reduxSaga = ReduxSaga();
let middleware = [reduxSaga];

if (process.env.NODE_ENV === 'production') {
	middleware = applyMiddleware(...middleware);
} else {
	const composeEnhancers = composeWithDevTools({
		/*OPTIONS*/
	});
	middleware = composeEnhancers(applyMiddleware(...middleware));
}

export const store = createStore(rootReducer, middleware);

reduxSaga.run(rootSaga);

const reduxProvider = children => {
	return <Provider store={store}>{children}</Provider>;
};

export default reduxProvider;
