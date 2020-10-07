import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>There is no posts for you!</div>;
  }
  return (
    <Layout variant="regular">
      <Flex mb={8}>
        <Heading>Reddit</Heading>
        <NextLink href="/create-post">
          <Link ml={"auto"}>create post</Link>
        </NextLink>
      </Flex>
      {fetching && !data ? (
        <div>loading...</div>
      ) : (
        data!.posts.posts.map((p) => (
          <Stack spacing={8} mb={4} key={p.id}>
            <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md">
              <Heading fontSize="xl">{p.title}</Heading>{" "}
              <Text>Post by {p.creator.username}</Text>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          </Stack>
        ))
      )}
      {data && data.posts.hasMore ? (
        <Flex justifyContent={"center"}>
          <Button
            my={8}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
