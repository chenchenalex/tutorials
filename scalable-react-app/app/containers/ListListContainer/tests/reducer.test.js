import expect from 'expect';
import listListContainerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('listListContainerReducer', () => {
  it('returns the initial state', () => {
    expect(listListContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
