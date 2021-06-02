import { HStack } from "@chakra-ui/react";
import DisplayText from "../DisplayText";

const TableHeader = () => {
  return (
    <HStack p="2" mb="4" bg="white" shadow="md">
      <DisplayText divideBy={6}>Name</DisplayText>
      <DisplayText divideBy={6}>City</DisplayText>
      <DisplayText divideBy={6}>State</DisplayText>
      <DisplayText divideBy={6}>Zip</DisplayText>
      <DisplayText divideBy={6}>Referred by</DisplayText>
      <DisplayText divideBy={6}></DisplayText>
    </HStack>
  );
};

export default TableHeader;
