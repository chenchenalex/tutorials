import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form.js";
import Error from "./ErrorMessage.js";
import { CURRENT_USER_QUERY } from "./User";

const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      name
      email
    }
  }
`;

class ResetPassword extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };
  state = {
    password: "",
    confirmPassword: "",
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={RESET_PASSWORD}
        variables={{ ...this.state, resetToken: this.props.resetToken }}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY,
          },
        ]}
      >
        {(reset, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await reset();
                this.setState({ password: "", confirmPassword: "" });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset your password</h2>
                <Error error={error} />

                <label htmlFor="password">
                  password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>

                <label htmlFor="confirmPassword">
                  confirm Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>

                <button type="submit">Confirm!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default ResetPassword;
