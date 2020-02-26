/*
 *
 * NavigationContainer reducer
 *
 */

import { fromJS } from "immutable";
import {} from "./constants";

const initialState = fromJS({
  topics: [
    {
      name: "library",
      description: "something should be here"
    },
    { name: "apple", description: "apple is healthy " },
    { name: "doctor", description: "life savers" }
  ]
});

function navigationContainerReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default navigationContainerReducer;
