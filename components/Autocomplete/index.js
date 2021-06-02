import Input from "../Input";
import { Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

const AutoComplete = ({ onChange = () => {} }) => {
  const [value, setValue] = React.useState("");
  const handleChange = () => {
    onChange(value);
    setValue("");
  };
  return (
    <InputGroup size="md">
      <Input
        pr="5rem"
        bg="gray.100"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search something here"
      />
      <InputRightElement width="5rem">
        <Button h="1.75rem" size="sm" colorScheme="blue" onClick={handleChange}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default AutoComplete;
