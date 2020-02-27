// import { take, call, put, select } from 'redux-saga/effects';
import { REQUEST_TOPICS } from "./constants";
import { takeLatest } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { requestTopicsSucceeded, requestTopicsFailed } from "./actions";

// Individual exports for testing
export function* fetchTopicsSaga() {
  yield takeLatest(REQUEST_TOPICS, fetchTopics);
}

function* fetchTopics() {
  try {
    const topics = yield call(fetchTopicsFromServer);
    yield put(requestTopicsSucceeded(topics));
  } catch (e) {
    yield put(requestTopicsFailed(e.message));
  }
}

export function fetchTopicsFromServer() {
  return fetch("http://localhost:3000/api/topics").then(res => res.json());
}

// All sagas to be loaded
export default [fetchTopicsSaga];
