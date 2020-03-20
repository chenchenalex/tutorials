/*
 *
 * LinkFormContainer
 *
 */

import React from "react";
import { connect } from "react-redux";
import LinkForm from "../../components/LinkForm";
import selectLinkFormContainer from "./selectors";

export class LinkFormContainer extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return <LinkForm {...this.props} />;
  }
}

const mapStateToProps = selectLinkFormContainer();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkFormContainer);
