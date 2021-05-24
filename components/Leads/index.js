import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Tag,
  Flex,
} from "@chakra-ui/react";
import RequestedLeads from "./RequestedLeads";
import Apis from "../../context/apis";
import React from "react";
import {
  GET_ACCEPTED_LEADS,
  GET_REJECTED_LEADS,
  GET_REQUESTED_LEADS,
} from "../../store/types/types";

const LeadsView = () => {
  return (
    <Box padding="2rem">
      <Tabs>
        <TabList>
          <Tab>
            <Tag backgroundColor="gray.300" color="gray.900">
              Requests
            </Tag>
          </Tab>
          <Tab>
            <Tag backgroundColor="green.300" color="green.900">
              Accepted
            </Tag>
          </Tab>
          <Tab>
            <Tag backgroundColor="red.300" color="red.900">
              Rejected
            </Tag>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <RequestedLeads tabType={GET_REQUESTED_LEADS} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default LeadsView;
