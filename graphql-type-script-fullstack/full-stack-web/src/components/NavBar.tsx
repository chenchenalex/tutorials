import React from "react";
import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    skip: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
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
          <Box mr={2}>
            <NextLink href="/create-post">
              <Link>create post</Link>
            </NextLink>
          </Box>
          <Box mr={2}>{data.me.username}</Box>
          <Button
            variant="link"
            color="black"
            onClick={() => {
              logout();
            }}
            isLoading={logoutFetching}
          >
            logout
          </Button>
        </Flex>
      </>
    );
  }
  return (
    <Flex position="sticky" top={0} zIndex={2} bg="tan" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};

export default NavBar;
