import expect from "expect";
import LinkListContainerReducer from "../reducer";
import { fromJS } from "immutable";

describe("LinkListContainerReducer", () => {
  it("returns the initial state", () => {
    expect(LinkListContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
