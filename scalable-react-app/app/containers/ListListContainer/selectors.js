import { createSelector } from 'reselect';

/**
 * Direct selector to the listListContainer state domain
 */
const selectListListContainerDomain = () => state => state.get('listListContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ListListContainer
 */

const selectListListContainer = () => createSelector(
  selectListListContainerDomain(),
  (substate) => substate.toJS()
);

export default selectListListContainer;
export {
  selectListListContainerDomain,
};
