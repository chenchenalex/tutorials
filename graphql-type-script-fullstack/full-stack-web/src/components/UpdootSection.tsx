import { Box, Flex, IconButton } from "@chakra-ui/core";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setloadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");

  const [, vote] = useVoteMutation();
  return (
    <Flex alignItems="center" direction="column" mr={4}>
      <IconButton
        icon="chevron-up"
        aria-label="upvote"
        isLoading={loadingState === "updoot-loading"}
        onClick={async () => {
          setloadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });

          setloadingState("not-loading");
        }}
      />
      <Box>{post.points}</Box>
      <IconButton
        icon="chevron-down"
        isLoading={loadingState === "downdoot-loading"}
        aria-label="downvote"
        onClick={async () => {
          setloadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });

          setloadingState("not-loading");
        }}
      />
    </Flex>
  );
};

export default UpdootSection;
