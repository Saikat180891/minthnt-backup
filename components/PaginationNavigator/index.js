import React from "react";
import { IconButton, Box, Text, HStack, VStack, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DropdownMenu from "../DropdownMenu";

const PaginationNavigator = ({ onPrevious = () => {}, onNext = () => {} }) => {
  return (
    <HStack spacing={3}>
      <IconButton
        rounded="full"
        onClick={onPrevious}
        aria-label="Previous"
        icon={<ChevronLeftIcon />}
      />
      <IconButton
        rounded="full"
        onClick={onNext}
        aria-label="Next"
        icon={<ChevronRightIcon />}
      />
    </HStack>
  );
};

export default PaginationNavigator;
