import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "../components/item";
import Pagination from "../components/Pagination";
import { perPage } from "../config";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <Pagination page={parseFloat(this.props.query.page) || 1} />
        <Query
          query={ALL_ITEMS_QUERY}
          variables={{
            skip: this.props.query.page * perPage - perPage,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>loading</p>;
            if (error) return <p>Error .... {error.message}</p>;
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item item={item} key={item.id} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination page={parseFloat(this.props.query.page) || 1} />
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
