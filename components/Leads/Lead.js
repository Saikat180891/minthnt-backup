import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Grid,
  GridItem,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import tw from "twin.macro";

const Lead = ({
  first_name = "",
  last_name = "",
  phone_no = "",
  email = "",
  address = {},
}) => {
  return (
    <AccordionItem
      marginBottom="1rem"
      backgroundColor="#f5f6f8"
      rounded="0.5rem"
      shadow="sm"
    >
      <Box>
        <AccordionButton
          padding="1rem"
          rounded="0.5rem"
          shadow="sm"
          outline="none"
          backgroundColor="white"
          outline="none"
          _hover={{ background: "white", outline: "none" }}
          _active={{ outline: "none" }}
        >
          <Box flex="1" textAlign="left">
            <Flex direction="column">
              <Box fontSize="12px" fontWeight="600" color="blackAlpha.800">
                {first_name}&nbsp;{last_name}
              </Box>
              <Flex
                fontSize="12px"
                fontWeight="600"
                color="gray.400"
                paddingTop="0.3rem"
              >
                <Box marginRight="1rem">Phn: {phone_no}</Box>
                <Box marginRight="1rem">Email: {email}</Box>
              </Flex>
            </Flex>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Box>
      <AccordionPanel pb={4}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Flex
            fontSize="12px"
            direction="column"
            padding="1rem"
            background="white"
            rounded="lg"
          >
            <Box fontStyle="14px" fontWeight="600">
              Address
            </Box>
            <Flex direction="column" color="gray.500">
              <Flex justifyContent="space-between">
                <Box>Floor Number</Box>
                {address?.floor_number}
              </Flex>
              <Flex justifyContent="space-between">
                <Box>Street</Box>
                {address?.street_address}
              </Flex>
              <Flex justifyContent="space-between">
                <Box>City</Box>
                {address?.city}
              </Flex>
              <Flex justifyContent="space-between">
                <Box>Zip Code</Box>
                {address?.zip_code}
              </Flex>
              <Flex justifyContent="space-between">
                <Box>State</Box>
                {address?.state}
              </Flex>
            </Flex>
          </Flex>
          <Box padding="1rem" background="white" rounded="lg" overflow="hidden">
            <Image src={address?.address_image} />
          </Box>
          <Flex
            alignItems="center"
            padding="1rem"
            background="white"
            rounded="lg"
            overflow="hidden"
            justifyContent="flex-end"
            direction="column"
          >
            <Text marginBottom="1rem">Accept Request?</Text>
            <Flex justifyContent="center">
              <Button
                backgroundColor="green.300"
                color="green.900"
                marginRight="2rem"
              >
                Accept
              </Button>
              <Button backgroundColor="red.300" color="red.900">
                Reject
              </Button>
            </Flex>
          </Flex>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
};
export default Lead;
