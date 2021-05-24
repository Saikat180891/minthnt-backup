import { Box, Accordion, Flex } from "@chakra-ui/react";
import React from "react";
import tw from "twin.macro";
import PaginationNavigator from "../PaginationNavigator";
import Lead from "./Lead";

const LeadListView = ({
  leads = [],
  onNext = () => {},
  onPrevious = () => {},
}) => {
  const [accordionIndexs, setAccordionIndexes] = React.useState([0]);

  const handleExpansion = (e) => {
    console.log(e);
  };

  return (
    <Box>
      <Flex justifyContent="flex-end" mb="4">
        <PaginationNavigator onNext={onNext} onPrevious={onPrevious} />
      </Flex>
      <Accordion defaultIndex={[0]} allowMultiple onChange={handleExpansion}>
        {leads?.map((lead) => (
          <Lead key={lead.id} {...lead} accordionIndexs={accordionIndexs} />
        ))}
      </Accordion>
    </Box>
  );
};

export default LeadListView;
