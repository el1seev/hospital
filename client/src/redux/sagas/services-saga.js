import { call, put, fork, takeEvery } from "redux-saga/effects";
import { GET_SERVICES, SET_SERVICES } from "../action-types/action-types";
import { fetchServices } from "../../api/fetchData";

function* getServices() {
  const response = yield call(fetchServices);
  yield put({ type: SET_SERVICES, payload: response.services });
}

function* forkServices(){
  yield fork(getServices);
}

function* servicesSaga() {
  yield takeEvery(GET_SERVICES, forkServices);
}

export default servicesSaga;