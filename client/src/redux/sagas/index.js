import { all } from 'redux-saga/effects';

import employeesSaga from './employees-saga';
import servicesSaga from './services-saga';
import specializationsSaga from './specializations-saga';

//run watchers
export default function* rootSaga() {
  yield all([employeesSaga(), servicesSaga(), specializationsSaga()]);
}