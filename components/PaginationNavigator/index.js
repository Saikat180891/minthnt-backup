import React from "react";
import { IconButton, Box, Text, HStack, VStack, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DropdownMenu from "../DropdownMenu";

const PaginationNavigator = ({ onPrevious = () => {}, onNext = () => {} }) => {
  return (
    <HStack spacing={3}>
      <IconButton
        rounded="full"
        bg="minthnt.gray3"
        onClick={onPrevious}
        aria-label="Previous"
        outline="none"
        _hover={{ bg: "minthnt.gray2", border: "none", outline: "none" }}
        _active={{ bg: "minthnt.gray2", border: "none", outline: "none" }}
        _focus={{ bg: "minthnt.gray3", border: "none", outline: "none" }}
        icon={<ChevronLeftIcon />}
      />
      <IconButton
        rounded="full"
        bg="minthnt.gray3"
        onClick={onNext}
        aria-label="Next"
        outline="none"
        _hover={{ bg: "minthnt.gray2", border: "none", outline: "none" }}
        _active={{ bg: "minthnt.gray2", border: "none", outline: "none" }}
        _focus={{ bg: "minthnt.gray3", border: "none", outline: "none" }}
        icon={<ChevronRightIcon />}
      />
    </HStack>
  );
};

export default PaginationNavigator;
