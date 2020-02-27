import { createSelector } from "reselect";

/**
 * Direct selector to the LinkListContainer state domain
 */
const selectLinkListContainerDomain = () => state =>
  state.get("LinkListContainer");

/**
 * Other specific selectors
 */

/**
 * Default selector used by LinkListContainer
 */

const selectLinkListContainer = () =>
  createSelector(selectLinkListContainerDomain(), substate => substate.toJS());

export default selectLinkListContainer;
export { selectLinkListContainerDomain };
