import { Input as ChakraInput } from "@chakra-ui/react";

const Input = ({ ...props }) => {
  return (
    <ChakraInput
      borderColor={"gray.300"}
      _hover={{
        borderColor: "gray.300",
      }}
      _active={{ borderColor: "gray.300", outline: "none" }}
      _focus={{
        borderColor: "gray.300",
        outline: "none",
      }}
      blur={{
        borderColor: "trasparent",
        outline: "none",
      }}
      {...props}
    />
  );
};

export default Input;
