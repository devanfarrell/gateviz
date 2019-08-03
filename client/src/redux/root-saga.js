import { fork, all } from 'redux-saga/effects';
import circuitListSaga from './circuitlist/saga';
import circuitSaga from './circuit/saga';

export default function* rootSaga() {
	yield all([fork(circuitListSaga), fork(circuitSaga)]);
}
