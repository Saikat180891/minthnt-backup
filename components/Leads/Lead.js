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
  HStack,
  Stack,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import React from "react";
import tw from "twin.macro";
import DisplayText from "../DisplayText";
import * as types from "../../store/types/types";
import ImagePreview from "../ImagePreview";

const Lead = ({
  first_name = "",
  last_name = "",
  phone_number = "",
  email = "",
  radio_image="",
  address = {},
  miscellaneous_questions = "",
  index = 0,
  referred_by = "",
  lead = {},
  tabType = "",
  onReject = () => {},
  onAccept = () => {},
  onImageUpload = () => {},
  email_link = 'mailto:'+email
}) => {
  const [misc, setMisc] = React.useState(
    miscellaneous_questions ? JSON.parse(miscellaneous_questions) : null
  );
  const [bg, setBg] = React.useState(
    index % 2 === 0 ? "white" : "blackAlpha.100"
  );
  const [radioimage, setRadioImage] = React.useState();

  const handleImageUpload = () => {
    onImageUpload(radioimage, lead);
  };

  return (
    <AccordionItem borderRadius="none" bg="whitesmoke">
      <AccordionButton
        p="0"
        borderRadius="none"
        shadow="sm"
        outline="none"
        backgroundColor={bg}
        outline="none"
        _hover={{ background: { bg }, outline: "none" }}
        _active={{ outline: "none" }}
        _focus={{ outline: "none" }}
      >
        <Flex direction="column" width="100%">
          <HStack p="2">
            <DisplayText divideBy={6}>
              {first_name}&nbsp;{last_name}
            </DisplayText>
            <DisplayText divideBy={6}>{address?.city}</DisplayText>
            <DisplayText divideBy={6}>{address?.state}</DisplayText>
            <DisplayText divideBy={6}>{address?.zip_code}</DisplayText>
            <DisplayText divideBy={6}>{referred_by}</DisplayText>
            <DisplayText divideBy={6}>
              <ButtonGroup spacing={2}>
                {tabType == types.GET_REQUESTED_LEADS && (
                  <>
                    <IconButton
                      w={4}
                      h={4}
                      p={4}
                      onClick={(e) => onAccept(e, lead)}
                      variant="outline"
                      colorScheme="green"
                      aria-label="Accept request"
                      icon={<CheckIcon />}
                    />
                    <IconButton
                      w={4}
                      h={4}
                      p={4}
                      onClick={(e) => onReject(e, lead)}
                      variant="outline"
                      colorScheme="red"
                      aria-label="Reject request"
                      icon={<CloseIcon />}
                    />
                  </>
                )}
              </ButtonGroup>
            </DisplayText>
          </HStack>
          <Box flex="1" textAlign="left">
            <Flex direction="column">
              {/* <Flex
              fontSize="12px"
              fontWeight="600"
              color="gray.400"
              paddingTop="0.3rem"
            >
              <Box marginRight="1rem">Phn: {phone_no}</Box>
              <Box marginRight="1rem">Email: {email}</Box>
            </Flex> */}
            </Flex>
          </Box>
        </Flex>
      </AccordionButton>
      <AccordionPanel pb={4} borderRadius="0">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Flex
            fontSize="12px"
            direction="column"
            padding="1rem"
            background="white"
          > 
          <Box fontStyle="14px" fontWeight="600">
          Contact
        </Box>
        <Flex direction="column" color="gray.500">
          <Flex justifyContent="space-between">
            <Box>Phone Nunber</Box>
            {phone_number}
          </Flex>
          <Flex justifyContent="space-between"  color="blue">
            <Box color="gray.500">Email</Box>
            <a href={email_link}>{email}</a>
          </Flex>
          </Flex>
            <Box fontStyle="14px"  mt="4" fontWeight="600">
              Address
            </Box>
            <Flex direction="column" color="gray.500">
              <Flex justifyContent="space-between">
                <Box>Floor Number</Box>
                {address?.floor_number}
              </Flex>
              <Flex justifyContent="space-between">
                <Box>Full Address</Box>
                {address?.place_name}
              </Flex>
              <Flex justifyContent="space-between">
                <Box>Apartment/Unit Number</Box>
                {address?.apartment_info}
              </Flex>
              <Flex justifyContent="space-between">
                <Box>City</Box>
                {address?.city}
              </Flex>
              <Flex justifyContent="space-between">
                <Box>State</Box>
                {address?.state}
              </Flex>
              <Flex justifyContent="space-between">
                <Box>Zip Code</Box>
                {address?.zip_code}
              </Flex>
            </Flex>
           
          </Flex>
          <Box padding="1rem" background="white" rounded="lg" overflow="hidden">
            <Image src={address?.address_image} />
          </Box>
          <Flex
            justifyItems="flex-start"
            alignItems="flex-start"
            background="white"
            rounded="lg"
            overflow="hidden"
            justifyContent="flex-end"
            direction="column"
            h="15rem"
            p="1"
          >{radio_image ?<img src={radio_image}/>:<>
            <Text>Upload a radio image</Text>
            <ImagePreview
              my="1"
              onChange={(e) => setRadioImage(e.target.files[0])}
            />
            <Button onClick={handleImageUpload}>Upload</Button></>}
          </Flex>
        </Grid>
        {misc && (
          <Flex direction="column" mt="4">
            {misc?.map((q, i) => (
              <Flex
                bg="white"
                p="4"
                justifyContent="flex-start"
                alignItems="flex-start"
                direction="column"
                key={i}
                fontSize="sm"
                rounded="lg"
              >
                <Box>{q.ques}</Box>
                <Box
                  rounded="md"
                  px="3"
                  py="1"
                  mt="1"
                  fontWeight="600"
                  bg={q.ans === true ? "green.300" : "red.300"}
                  color="white"
                >
                  {q.ans === true ? "Yes" : "No"}
                </Box>
              </Flex>
            ))}
          </Flex>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};
export default Lead;
