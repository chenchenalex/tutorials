/*
 *
 * ListListContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectListListContainer from './selectors';

export class ListListContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = selectListListContainer();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListListContainer);
