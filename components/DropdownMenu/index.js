import { Menu, MenuButton, MenuList, MenuItem, Flex } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import Button from "@/Button";

const DropdownMenu = ({
  children,
  options = [],
  onChange = () => {},
  w = "15rem",
  ...rest
}) => {
  const [selectedOption, setSelectedOption] = React.useState(children);

  const handleOptionChange = (option) => {
    setSelectedOption(option?.label);
    onChange(option?.value);
  };

  return (
    <Menu h="full">
      <MenuButton
        w={w}
        h="full"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        px="0.5rem"
        {...rest}
      >
        <Flex justifyContent="space-between" alignItems="center">
          {selectedOption} <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {options.map((option, i) => (
          <MenuItem key={i} onClick={() => handleOptionChange(option)}>
            {option?.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
