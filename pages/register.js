import LeadForm from "@/LeadForm";
import { Flex, Box, Spinner } from "@chakra-ui/react";
import tw from "twin.macro";
import Apis from "../context/apis";
import Modal from "@/Modal";
import React from "react";

const Register = () => {
  const [showModal, setShowModal] = React.useState(false);

  const handleSubmit = async (payload, actions) => {
    setShowModal(true);
    try {
      await Apis.createLead(payload);
      actions.resetForm();
    } catch (err) {}
    setShowModal(false);
  };
  return (
    <Flex justifyContent="center" alignItems="center" tw="bg-purple-100">
      <Box width="40rem" paddingY="2rem">
        <LeadForm onSubmit={handleSubmit} />
      </Box>
      <Modal show={showModal} blurBackground>
        <Flex
          justifyContent="center"
          alignItems="center"
          padding="1rem"
          rounded="lg"
          backgroundColor="white"
        >
          <Box marginRight="1rem">Submitting please wait...</Box>
          <Spinner />
        </Flex>
      </Modal>
    </Flex>
  );
};
export default Register;
