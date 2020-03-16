/**
 *
 * Login
 *
 */

import React from "react";
import validator from "email-validator";
import styles from "./styles.css";

class Login extends React.Component {
  state = {};
  // eslint-disable-line react/prefer-stateless-function
  login = () => {
    const email = this.emailField.value;
    if (!validator.validate(email)) {
      this.setState({
        errorText: "Please provide a valid email",
      });

      return;
    }

    this.setState({
      errorText: null,
    });
  };
  render() {
    const fieldError = this.state.errorText ? (
      <div className={styles.errorMessage}>{this.state.errorText}</div>
    ) : null;

    return (
      <div className={styles.login}>
        <div className={styles.heading}>Login with your email</div>
        <input
          type="text"
          className={styles.input}
          placeholder="Your email"
          ref={f => {
            this.emailField = f;
          }}
        />
        {fieldError}
        <div className={styles.actionContainer}>
          <div className={styles.button}>Cancel</div>
          <div className={styles.button} onClick={this.login}>
            Log in{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
