/*
 *
 * LoginContainer
 *
 */

import React from "react";
import { connect } from "react-redux";
import Login from "../../components/Login";
import selectLoginContainer from "./selectors";

export class LoginContainer extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Login {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = selectLoginContainer();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
