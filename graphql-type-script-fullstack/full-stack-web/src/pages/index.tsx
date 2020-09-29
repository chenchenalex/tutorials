import { Box } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import Layout from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 20,
    },
  });
  return (
    <Layout>
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((p) => <Box key={p.id}>{p.title}</Box>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
