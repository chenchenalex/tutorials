// import { take, call, put, select } from 'redux-saga/effects';
import {
  REQUEST_TOPICS,
  SELECT_TOPIC,
  REQUEST_TOPICS_SUCCEEDED,
} from "./constants";
import { takeLatest } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { requestTopicsSucceeded, requestTopicsFailed } from "./actions";
import { push } from "react-router-redux";
import selectNavigationContainer from "./selectors";

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

function* selectDefaultTopic() {
  const state = yield select(selectNavigationContainer());

  if (!state.selectedTopic) {
    yield put(push(`/topics/${state.topics[0].name}`));
  }
}

export function fetchTopicsFromServer() {
  return fetch("http://localhost:3000/api/topics").then(res => res.json());
}

export function* selectDefaultTopicSaga() {
  yield takeLatest(REQUEST_TOPICS_SUCCEEDED, selectDefaultTopic);
}

function* pushTopic(action) {
  yield put(push(`/topics/${action.topic.name}`));
}

export function* selectTopicSaga() {
  yield takeLatest(SELECT_TOPIC, pushTopic);
}

// All sagas to be loaded
export default [fetchTopicsSaga, selectTopicSaga, selectDefaultTopicSaga];
