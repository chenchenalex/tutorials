import { Box, Heading, Stack, Text } from "@chakra-ui/core";
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
    <Layout variant="regular">
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((p) => (
          <Stack spacing={8} mb={4} key={p.id}>
            <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          </Stack>
        ))
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
