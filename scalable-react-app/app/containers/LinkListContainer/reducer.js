/*
 *
 * LinkListContainer reducer
 *
 */

import { fromJS } from "immutable";
import {} from "./constants";

const initialState = fromJS({
  links: [
    {
      description: "this is my link",
      url: "https://github.com/chenchenalex",
    },
  ],
});

function LinkListContainerReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default LinkListContainerReducer;
