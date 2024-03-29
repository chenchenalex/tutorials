import React from "react";
import { Box } from "@chakra-ui/core";

export type WrapperVariant = "small" | "regular";
interface WrapperProps {
  variant?: WrapperVariant;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Box maxW={variant === "regular" ? "800px" : "400px"} w="100%" mx="auto" mt={8}>
      {children}
    </Box>
  );
};

export default Wrapper;
