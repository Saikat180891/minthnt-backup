import { Box, Accordion } from "@chakra-ui/react";
import React from "react";
import Lead from "./Lead";
import TableHeader from "./TableHeader";
import ActionBar from "../ActionBar";
import { filterOptions } from "./initialValues.model";

const LeadListView = ({
  tabType = "",
  leads = [],
  onChange = () => {},
  onReject = () => {},
  onAccept = () => {},
  onImageUpload = () => {},
  isLoading = false,
}) => {
  const [accordionIndexs, setAccordionIndexes] = React.useState([0]);

  const handleExpansion = (e) => {
    console.log(e);
  };

  return (
    <Box>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <ActionBar {...{ filterOptions, onChange }} />
          <TableHeader />
          <Accordion
            borderRadius="none"
            defaultIndex={[0]}
            allowMultiple
            onChange={handleExpansion}
          >
            {leads?.map((lead, i) => (
              <Lead
                key={lead.id}
                index={i}
                {...lead}
                tabType={tabType}
                lead={lead}
                onReject={onReject}
                onAccept={onAccept}
                onImageUpload={onImageUpload}
                accordionIndexs={accordionIndexs}
              />
            ))}
          </Accordion>
        </>
      )}
    </Box>
  );
};

export default LeadListView;
