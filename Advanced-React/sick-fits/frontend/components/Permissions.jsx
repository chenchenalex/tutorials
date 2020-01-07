import { Query, Mutation } from "react-apollo";
import Error from "./ErrorMessage";
import gql from "graphql-tag";
import Table from "./styles/Table";
import { Component } from "react";
import SickButton from "./styles/SickButton";
import PropTypes from "prop-types";

const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      name
      id
      email
      permissions
    }
  }
`;

const UPDATE_PERMISSIONS = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      name
      id
      email
      permissions
    }
  }
`;

const POSSIBLE_PERMISSIONS = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE",
];

const Permissions = () => (
  <Query query={USERS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading</p>;
      return (
        <div>
          <Error error={error} />
          <Table>
            <thead>
              <tr>
                <th>name</th>
                <th>Email</th>
                {POSSIBLE_PERMISSIONS.map((permission, index) => (
                  <th key={index}>{permission}</th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <UserPermissions data={user} key={user.id} />
              ))}
            </tbody>
          </Table>
        </div>
      );
    }}
  </Query>
);

class UserPermissions extends Component {
  static propTypes = {
    data: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permission: PropTypes.array,
    }).isRequired,
  };

  state = {
    // prop in this case will never change, we only need it once
    permissions: this.props.data.permissions,
  };

  handleChange = (e, updatePermission) => {
    const checkbox = e.target;
    const isChecked = checkbox.checked;
    let updatedPermission = [...this.state.permissions];

    // add or remove permissions
    if (isChecked) {
      updatedPermission.push(checkbox.value);
    } else {
      updatedPermission = updatedPermission.filter(
        permission => permission !== checkbox.value,
      );
    }
    this.setState({ permissions: updatedPermission }, updatePermission);
  };

  render() {
    const user = this.props.data;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS}
        variables={{ permissions: this.state.permissions, userId: user.id }}
      >
        {(updatePermission, { loading, error }) => {
          return (
            <>
              {error && (
                <tr>
                  <td colspan="9">
                    <Error error={error} />
                  </td>
                </tr>
              )}
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {POSSIBLE_PERMISSIONS.map(permission => {
                  const isChecked = this.state.permissions.includes(permission);
                  const name = `${user.id}-permission-${permission}`;
                  return (
                    <td key={permission}>
                      <label htmlFor={name}>
                        <input
                          type="checkbox"
                          id={name}
                          checked={isChecked}
                          value={permission}
                          onChange={e => {
                            this.handleChange(e, updatePermission);
                          }}
                        />
                      </label>
                    </td>
                  );
                })}
                <td>
                  <SickButton onClick={updatePermission} disabled={loading}>
                    Updat{loading ? "ing" : "e"}
                  </SickButton>
                </td>
              </tr>
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default Permissions;
