import { all } from "redux-saga/effects";
import employeesSaga from "./employees-saga";

//run watchers
export default function* rootSaga() {
  yield all([employeesSaga()]);
}