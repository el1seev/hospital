import { call, put, fork, takeEvery } from "redux-saga/effects";
import { GET_EMPLOYEES, SET_EMPLOYEES } from "../action-types/action-types";
import { fetchEmployees } from "../../api/fetchData";

function* getEmployees() {
  const response = yield call(fetchEmployees);
  yield put({ type: SET_EMPLOYEES, payload: response });
}

function* forkEmployees(){
  yield fork(getEmployees);
}

function* employeesSaga() {
  yield takeEvery(GET_EMPLOYEES, forkEmployees);
}

export default employeesSaga;