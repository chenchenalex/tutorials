import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const CURRENT_USER_SIGNOUT = gql`
  mutation CURRENT_USER_SIGNOUT {
    signout {
      message
    }
  }
`;

const Signout = props => {
  return (
    <Mutation
      mutation={CURRENT_USER_SIGNOUT}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {signout => {
        return <button onClick={signout}>Sign out</button>;
      }}
    </Mutation>
  );
};

export default Signout;
