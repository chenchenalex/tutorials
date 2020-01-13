import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const NiceLookingButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

export default class RemoveFromCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  update = (cache, payload) => {
    // this gets called as soon as a response back from mutation has been performed, before refeching query
    // first read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    // remove item from the cart
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(item => item.id !== cartItemId);
    // write it back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        optimisticResponse={{
          __typename: "Mutation",
          removeFromCart: { id: this.props.id },
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(removeItem, { loading, error }) => {
          return (
            <NiceLookingButton
              disabled={loading}
              title="delete item"
              onClick={removeItem}
            >
              &times;
            </NiceLookingButton>
          );
        }}
      </Mutation>
    );
  }
}
