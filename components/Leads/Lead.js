import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  Grid,
  GridItem,
  Image,
  Button,
  Text,
  HStack,
  Link,
} from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import React from "react";
import * as types from "../../store/types/types";
import ImageUpload from "../ImagePreview";
import { StatusIndicator } from "@/Icons";
import Modal from "@/Modal";
import { BarLoader } from "react-spinners";
import { columns } from "./LeadsListHeader";

const Lead = ({
  first_name = "",
  last_name = "",
  phone_number = "",
  email = "",
  radio_image = "",
  address = {},
  miscellaneous_questions = "",
  index = 0,
  referred_by = "",
  lead = {},
  status = "",
  applied_referral_code = "",
  activeTab = types.ON_HOLD,
  loaders = {},
  onReject = () => {},
  onAccept = () => {},
  onImageUpload = () => {},
  sort = "",
}) => {
  const [misc] = React.useState(
    miscellaneous_questions ? JSON.parse(miscellaneous_questions) : null
  );
  const [radioimage, setRadioImage] = React.useState();
  const [modalImage, setModalImage] = React.useState();
  const handleImageUpload = () => {
    onImageUpload(radioimage, lead);
  };

  return (
    <AccordionItem
      borderRadius="none"
      border="none"
      bg="whitesmoke"
      w="full"
      mb="4"
    >
      <AccordionButton
        p="0"
        borderRadius="none"
        shadow="sm"
        outline="none"
        bg="minthnt.gray3"
        outline="none"
        border="none"
        w="full"
        h="3rem"
        _hover={{ border: "none", outline: "none" }}
        _active={{ outline: "none", border: "none" }}
        _focus={{ outline: "none", border: "none" }}
      >
        <Grid
          templateColumns="repeat(6, 1fr)"
          w="full"
          h="full"
          alignContent="center"
          justifyItems="start"
          fontSize="14"
          gap={6}
        >
          <GridItem
            pl="4"
            color={sort === columns[0].toUpperCase() ? "minthnt.green1" : ""}
          >
            {first_name}&nbsp;{last_name}
          </GridItem>
          <GridItem
            color={sort === columns[1].toUpperCase() ? "minthnt.green1" : ""}
          >
            {address?.city}
          </GridItem>
          <GridItem
            color={sort === columns[2].toUpperCase() ? "minthnt.green1" : ""}
          >
            {address?.state}
          </GridItem>
          <GridItem
            color={sort === columns[3].toUpperCase() ? "minthnt.green1" : ""}
          >
            {address?.zip_code}
          </GridItem>
          <GridItem
            color={sort === columns[4].toUpperCase() ? "minthnt.green1" : ""}
          >
            {address?.referred_by}
          </GridItem>
          <GridItem
            fontWeight="600"
            color={sort === columns[5].toUpperCase() ? "minthnt.green1" : ""}
          >
            {status.replace("_", " ")}
          </GridItem>
        </Grid>
      </AccordionButton>
      <AccordionPanel borderRadius="0" bg="black" px="0" py="6" fontSize="12">
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem colSpan="3">
            <Flex w="full" direction="column">
              <Box w="full" fontWeight="bold" pb="2">
                MAILING ADDRESS
              </Box>
              <Text color="minthnt.blue2" fontWeight="semibold">
                Name
              </Text>
              <Text pb="2">
                {first_name}&nbsp;{last_name}
              </Text>
              <Text color="minthnt.blue2" fontWeight="semibold">
                Contact
              </Text>
              <Text>{phone_number}</Text>
              <Text pb="2" textDecor="underline" cursor="pointer">
                <Link href={`mailto:${email}`}>{email}</Link>
              </Text>
              <Text color="minthnt.blue2" fontWeight="semibold">
                Floor
              </Text>
              <Text pb="2">{address?.floor_number}</Text>
              <Text color="minthnt.blue2" fontWeight="semibold">
                Apartment info
              </Text>
              <Text pb="2">{address?.apartment_info}</Text>
              <Text color="minthnt.blue2" fontWeight="semibold">
                Full Adddress
              </Text>
              <Text pb="2">{address?.place_name}</Text>
              <Text
                textDecor="underline"
                color="minthnt.green1"
                cursor="pointer"
                fontWeight="bold"
              >
                <Link
                  href={`/address-map?lat=${address?.latitude}&lng=${address?.longitude}`}
                  target="_blank"
                >
                  View on map
                </Link>
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan="3">
            <Flex w="full" direction="column">
              <Box w="full" fontWeight="bold" pb="2">
                ADMIN NOTES
              </Box>
              {misc?.map((q, i) => (
                <Box key={i}>
                  <Text mb="1">{q.ques}</Text>
                  <Box>
                    {q.ans === true ? (
                      <HStack spacing={2}>
                        <StatusIndicator status={true} /> <Text>Yes</Text>
                      </HStack>
                    ) : (
                      <HStack spacing={2}>
                        <StatusIndicator status={false} /> <Text>No</Text>
                      </HStack>
                    )}
                  </Box>
                </Box>
              ))}
            </Flex>
          </GridItem>
          <GridItem colSpan="2">
            <Flex w="full" direction="column">
              <Box w="full" fontWeight="bold" pb="2">
                REFERRALS
              </Box>
              {referred_by && (
                <>
                  <Text color="minthnt.blue2" fontWeight="semibold">
                    Referred By
                  </Text>
                  <Text pb="2">{referred_by}</Text>
                </>
              )}
              {applied_referral_code && (
                <>
                  <Text color="minthnt.blue2" fontWeight="semibold">
                    Referral Code
                  </Text>
                  <Text pb="2">{applied_referral_code}</Text>
                </>
              )}
            </Flex>
          </GridItem>
          <GridItem colSpan="2">
            <Flex w="full" direction="column">
              <Box w="full" fontWeight="bold" pb="2">
                HOST VIEW
              </Box>
              {address?.address_image ? (
                <Image
                  w="full"
                  h="8rem"
                  objectFit="cover"
                  cursor="pointer"
                  src={address?.address_image}
                  onClick={() => setModalImage(address?.address_image)}
                />
              ) : (
                <Flex
                  w="full"
                  h="8rem"
                  bg="minthnt.gray3"
                  justifyContent="center"
                  alignItems="center"
                  fontStyle="italic"
                >
                  No image uploaded
                </Flex>
              )}
            </Flex>
          </GridItem>
          <GridItem colSpan="2">
            <Flex w="full" direction="column">
              <Box w="full" fontWeight="bold" pb="2">
                RF ANALYSIS
              </Box>
              {radio_image ? (
                <Image
                  h="8rem"
                  objectFit="cover"
                  src={radio_image}
                  cursor="pointer"
                  onClick={() => setModalImage(radio_image)}
                />
              ) : (
                <>
                  <ImageUpload
                    h="8rem"
                    disabled={loaders?.["RF_IMAGE_LOADER"] === true}
                    onChange={(e) => setRadioImage(e.target.files[0])}
                  />
                  <Flex
                    w="full"
                    my="2"
                    visibility={
                      loaders?.["RF_IMAGE_LOADER"] === true
                        ? "visible"
                        : "hidden"
                    }
                  >
                    <BarLoader color="#fff" width="100%" />
                  </Flex>
                  <Button
                    w="min-content"
                    bg="blue.500"
                    outline="none"
                    border="none"
                    disabled={loaders?.["RF_IMAGE_LOADER"] === true}
                    borderRadius="0 1rem 0 1rem"
                    _hover={{
                      bg: "blue.500",
                      outline: "none",
                      border: "none",
                    }}
                    _active={{
                      bg: "blue.500",
                      outline: "none",
                      border: "none",
                    }}
                    _focus={{
                      bg: "blue.500",
                      outline: "none",
                      border: "none",
                    }}
                    onClick={handleImageUpload}
                  >
                    Upload
                  </Button>
                </>
              )}
            </Flex>
          </GridItem>
          <GridItem colSpan="12">
            <HStack spacing={4}>
              {activeTab === types.ON_HOLD && (
                <>
                  <Button
                    onClick={(e) => onAccept(e, lead)}
                    bg="green.500"
                    outline="none"
                    border="none"
                    borderRadius="0 1rem 0 1rem"
                    _hover={{
                      bg: "green.500",
                      outline: "none",
                      border: "none",
                    }}
                    _active={{
                      bg: "green.500",
                      outline: "none",
                      border: "none",
                    }}
                    _focus={{
                      bg: "green.500",
                      outline: "none",
                      border: "none",
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={(e) => onReject(e, lead)}
                    bg="red.500"
                    outline="none"
                    border="none"
                    borderRadius="0 1rem 0 1rem"
                    _hover={{ bg: "red.500", outline: "none", border: "none" }}
                    _active={{ bg: "red.500", outline: "none", border: "none" }}
                    _focus={{ bg: "red.500", outline: "none", border: "none" }}
                  >
                    Reject
                  </Button>
                </>
              )}
              {activeTab !== types.ON_HOLD && (
                <Button
                  onClick={(e) => onReject(e, lead)}
                  bg="orange.500"
                  outline="none"
                  border="none"
                  borderRadius="0 1rem 0 1rem"
                  _hover={{ bg: "orange.500", outline: "none", border: "none" }}
                  _active={{
                    bg: "orange.500",
                    outline: "none",
                    border: "none",
                  }}
                  _focus={{ bg: "orange.500", outline: "none", border: "none" }}
                >
                  Move to On Hold
                </Button>
              )}
            </HStack>
          </GridItem>
        </Grid>
        <Modal show={modalImage}>
          <Box w="50vw" h="30rem" position="relative" bg="black">
            <Flex
              justifyContent="center"
              alignItems="center"
              color="white"
              w="6"
              h="6"
              rounded="full"
              bg="minthnt.gray2"
              position="absolute"
              top="0"
              right="0"
              transform="translate3d(0.7rem, -0.7rem, 0)"
              cursor="pointer"
              onClick={() => setModalImage("")}
            >
              <CloseIcon w={3} h={3} />
            </Flex>
            <Image w="full" h="full" objectFit="cover" src={modalImage} />
          </Box>
        </Modal>
      </AccordionPanel>
    </AccordionItem>
  );
};
export default Lead;
