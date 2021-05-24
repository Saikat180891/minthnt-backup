import React from "react";
import { IconButton, Box } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const PaginationNavigator = ({ onPrevious = () => {}, onNext = () => {} }) => {
  return (
    <Box>
      <IconButton
        onClick={onPrevious}
        colorScheme="blue"
        aria-label="Search database"
        icon={<ChevronLeftIcon />}
        mr="3"
      />
      <IconButton
        onClick={onNext}
        colorScheme="blue"
        aria-label="Search database"
        icon={<ChevronRightIcon />}
      />
    </Box>
  );
};

export default PaginationNavigator;
