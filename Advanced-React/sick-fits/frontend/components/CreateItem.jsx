import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import styled from "styled-components";
import { ALL_ITEMS_QUERY } from "../pages/items";
import Error from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

const StyledButton = styled.button`
  &[disabled] {
    background: grey;
    color: white;
  }
`;

class CreateItem extends Component {
  state = {
    title: "Cool shoes",
    description: "Bao bao rou",
    image: "",
    largeImage: "",
    price: 120,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;

    this.setState({
      [name]: val,
    });
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    this.setState({
      uploadFile: true,
    });

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqpfnofx9/image/upload/",
      {
        method: "POST",
        body: data,
      },
    );

    const file = await res.json();

    // TODO: set form ready to submit after image is successfully loaded
    this.setState({
      uploadFile: false,
      image: file.secure_url,
      largeImage: file.eager && file.eager[0].secure_url,
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // stop the form from submiting
              e.preventDefault();
              // call the mutation
              const res = await createItem();
              // redirect to item page
              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id },
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Upload image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  value={this.state.file}
                  onChange={this.uploadFile}
                  required
                />
                {this.state.image && (
                  <img
                    name="image"
                    width="200"
                    src={this.state.image}
                    alt="Upload preview"
                  />
                )}
              </label>

              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter a description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                />
              </label>
            </fieldset>
            <StyledButton type="submit" disabled={this.state.uploadFile}>
              Submit{loading && "ing"}
            </StyledButton>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
