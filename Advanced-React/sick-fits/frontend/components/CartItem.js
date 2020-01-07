import React, { Component } from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import PropTypes from "prop-types";

const CartItemStyles = styled.li``;

export default class CartItem extends Component {
  render() {
    const { cartItem } = this.props;
    return <CartItemStyles>hi {cartItem.id}</CartItemStyles>;
  }
}

CartItem.proptypes = {
  cartItem: PropTypes.object.isRequired,
};
