import { call, put, fork, takeEvery } from "redux-saga/effects";
import { GET_SPECIALIZATIONS, SET_SPECIALIZATIONS } from "../action-types/action-types";
import { fetchSpecializations } from "../../api/fetchData";

function* getSpecializations() {
  const response = yield call(fetchSpecializations);
  console.log(response)
  yield put({ type: SET_SPECIALIZATIONS, payload: response });
}

function* forkSpecializations(){
  yield fork(getSpecializations);
}

function* specializationsSaga() {
  yield takeEvery(GET_SPECIALIZATIONS, forkSpecializations);
}

export default specializationsSaga;