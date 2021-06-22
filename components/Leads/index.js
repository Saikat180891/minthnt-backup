import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import LeadList from "./LeadList";
import Apis from "../../context/apis";
import React from "react";
import {
  ACCEPTED_LEADS,
  REJECTED_LEADS,
  ON_HOLD,
} from "../../store/types/types";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { setLeads, setActiveTab } from "../../store/actions/leads.actions";
import { startLoader, stopLoader } from "../../store/actions/loader.action";
import { connect } from "react-redux";
import * as Loaders from "../../store/types/loaderTypes";
import { asyncFetcher } from "../../context/apis";

const RoundIcon = ({ children, ...rest }) => {
  return (
    <Flex
      bg="minthnt.gray3"
      w="1.5rem"
      h="1.5rem"
      rounded="full"
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      {children}
    </Flex>
  );
};

const TabButton = ({ icon, label, onClick = () => {}, bg, ...rest }) => {
  return (
    <Flex
      alignItems="center"
      color="white"
      cursor="pointer"
      fontWeight={600}
      px={4}
      py={2}
      roundedBottomLeft={10}
      roundedTopRight={10}
      onClick={onClick}
      bg={bg}
      {...rest}
    >
      <RoundIcon mr={2}>{icon}</RoundIcon>
      {label}
    </Flex>
  );
};

const LeadsView = ({
  setLeads,
  setActiveTab,
  startLoader,
  stopLoader,
  activeTab = ON_HOLD,
  filters = {},
  itemsPerPage = 10,
  currentPage = 1,
  sort = "",
}) => {
  //
  const changeTab = async (tabType = ON_HOLD) => {
    setActiveTab(tabType);
    startLoader(Loaders.GET_LEAD_LIST);
    const leads = await asyncFetcher(
      Apis.getLeadsList(currentPage, tabType, itemsPerPage, filters, sort)
    );
    stopLoader(Loaders.GET_LEAD_LIST);
    setLeads({ leads: leads?.results, count: leads?.count });
  };

  React.useEffect(() => {
    changeTab(activeTab);
  }, [activeTab, filters, currentPage, sort]);

  return (
    <Box padding="2rem" paddingTop="3rem">
      <HStack spacing={8}>
        <TabButton
          icon={<Text fontSize="10px">||</Text>}
          label="On Hold"
          onClick={() => setActiveTab(ON_HOLD)}
          bg={activeTab === ON_HOLD && "minthnt.gray2"}
          _hover={{ bg: "minthnt.gray2" }}
        />
        <TabButton
          icon={<CheckIcon w="3" />}
          label="Accepted"
          onClick={() => setActiveTab(ACCEPTED_LEADS)}
          bg={activeTab === ACCEPTED_LEADS && "minthnt.gray2"}
          _hover={{ bg: "minthnt.gray2" }}
        />
        <TabButton
          icon={<SmallCloseIcon />}
          label="Rejected"
          onClick={() => setActiveTab(REJECTED_LEADS)}
          bg={activeTab === REJECTED_LEADS && "minthnt.gray2"}
          _hover={{ bg: "minthnt.gray2" }}
        />
      </HStack>
      <Box pt={6} w="full" h="full" overflow="auto">
        <LeadList />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activeTab: state.leads.activeTab,
    filters: state.leads.others.filters,
    itemsPerPage: state.leads.itemsPerPage,
    currentPage: state.leads.currentPage,
    sort: state.leads.sort,
  };
};

export default connect(mapStateToProps, {
  setLeads,
  setActiveTab,
  startLoader,
  stopLoader,
})(LeadsView);
