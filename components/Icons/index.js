import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";

export const StatusIndicator = ({ status = false }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="5"
      h="5"
      bg={status ? "green.500" : "red.500"}
      rounded="full"
    >
      {status ? <CheckIcon /> : <CloseIcon w="2" h="2" />}
    </Flex>
  );
};
