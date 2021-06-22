import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
} from "@chakra-ui/react";
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
    <Menu h="full" w={w}>
      <MenuButton
        w={w}
        h="full"
        px="0.5rem"
        border="none"
        bg="minthnt.gray3"
        borderRadius="md"
        {...rest}
      >
        <Flex justifyContent="space-between" alignItems="center">
          {selectedOption}{" "}
          <Text color="minthnt.green1">
            <ChevronDownIcon />
          </Text>
        </Flex>
      </MenuButton>
      <MenuList bg="minthnt.gray3" border="none" shadow="dark-lg" w="full">
        {options.map((option, i) => (
          <MenuItem
            _focus={{ bg: "minthnt.gray2", color: "minthnt.gray3" }}
            _hover={{ bg: "minthnt.gray2", color: "minthnt.gray3" }}
            key={i}
            onClick={() => handleOptionChange(option)}
          >
            {option?.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
