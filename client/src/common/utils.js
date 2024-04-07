import { Box } from "@chakra-ui/react";

function space(direction, value) {
  if (direction === "v") {
    return <Box marginTop={value} />;
  } else {
    return <Box marginRight={value} />;
  }
}

const utils = {
  space,
};

export default utils;
