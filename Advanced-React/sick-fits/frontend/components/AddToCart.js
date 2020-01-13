import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "./User";

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const StyledButton = styled.button`
  cursor: ${props => (props.disabled ? "normal" : "pointer")};
`;

function AddToCart({ id }) {
  const [mutate, { loading }] = useMutation(ADD_TO_CART_MUTATION);

  return (
    <StyledButton
      disabled={loading}
      onClick={() => {
        mutate({
          variables: { id },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
      }}
    >
      {loading ? "please wait" : " Add to Cart 🛒"}
    </StyledButton>
  );
}

export default AddToCart;
