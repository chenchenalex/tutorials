import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint } from "../config";
import { LOCAL_STATE_QUERY } from "../components/Cart";

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include",
        },
        headers,
      });
    },
    // store local data
    clientState: {
      resolvers: {
        Mutation: {
          // first variable is not needed and used, second is for any param, third is what we want
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cart cache
            const cart = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });

            // write the state
            const data = {
              data: {
                cartOpen: !cart.cartOpen,
              },
            };

            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
