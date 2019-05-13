import { fork, all } from 'redux-saga/effects';
import circuitListSaga from './circuitlist/saga';

export default function* rootSaga() {
	yield all([fork(circuitListSaga)]);
}
