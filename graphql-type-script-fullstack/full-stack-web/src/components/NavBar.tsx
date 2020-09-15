import React from "react";
import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  if (fetching) {
    // data loading
  } else if (!data?.me) {
    // user not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Flex>
          <Box mr={2}>{data.me.username}</Box>
          <Button variant="link" color="black">
            logout
          </Button>
        </Flex>
      </>
    );
  }
  return (
    <Flex bg="lightgrey" p={4}>
      <Box ml={"auto"}></Box>
      {body}
    </Flex>
  );
};

export default NavBar;
