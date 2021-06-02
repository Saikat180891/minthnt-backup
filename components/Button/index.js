import { Button as ChakraButton } from "@chakra-ui/icons";

const Button = ({ children, ...rest }) => {
  return (
    <ChakraButton
      borderColor={"gray.300"}
      _hover={{
        borderColor: "gray.300",
      }}
      _active={{ borderColor: "gray.300", outline: "none" }}
      _focus={{
        borderColor: "gray.300",
        outline: "none",
      }}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
