import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "../pages/items";

const DELETE_ITEM_MUTAION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });

    // 2. filter the deleted item
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id,
    );

    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTAION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => {
          if (error) console.log(error);

          return (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this?")) {
                  deleteItem().catch(err => {
                    alert(err.message);
                  });
                }
              }}
            >
              {this.props.children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteItem;
