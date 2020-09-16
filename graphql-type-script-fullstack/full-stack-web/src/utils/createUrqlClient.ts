import { dedupExchange, fetchExchange } from "urql";
import { MeDocument, LoginMutation, MeQuery, RegisterMutation, LogoutMutation } from "../generated/graphql";
import { cacheExchange } from "@urql/exchange-graphcache";

import betterUpdateQuery from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    // Replace the default cacheExchange with the new one
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({ me: null }));
          },
          login: (_result, _, cache) => {
            betterUpdateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
              if (result.login.errors) {
                return query;
              } else {
                return {
                  me: result.login.user,
                };
              }
            });
          },
          register: (_result, _, cache) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
              if (result.register.errors) {
                return query;
              } else {
                return {
                  me: result.register.user,
                };
              }
            });
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
