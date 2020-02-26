// import { take, call, put, select } from 'redux-saga/effects';
import { REQUEST_TOPICS } from "./constants";
import { takeLatest } from "redux-saga";
import { call } from "redux-saga/effects";

// Individual exports for testing
export function* fetchTopicsSaga() {
  yield takeLatest(REQUEST_TOPICS, fetchTopics);
}

function* fetchTopics() {
  const result = call(fetchTopicsFromServer);
  console.log("return from the server!", result);
}

export function fetchTopicsFromServer() {
  return fetch("https://localhost:3000/api/topics").then(res => res.json());
}

// All sagas to be loaded
export default [fetchTopicsSaga];
