import { Box, Accordion, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Lead from "./Lead";
import LeadsListHeader from "./LeadsListHeader";
import ActionBar from "../ActionBar";
import { filterOptions } from "./initialValues.model";
import { connect } from "react-redux";
import { ON_HOLD } from "../../store/types/types";
import * as Loaders from "../../store/types/loaderTypes";
import { BeatLoader } from "react-spinners";
import Apis, { asyncFetcher } from "../../context/apis";
import { jsonToFormData } from "../../utils";
import {
  updateRadioImage,
  removeLeads,
} from "../../store/actions/leads.actions";
import { stopLoader, startLoader } from "../../store/actions/loader.action";

const LeadList = ({
  leads = [],
  onChange = () => {},
  onReject = () => {},
  onAccept = () => {},
  updateRadioImage = () => {},
  startLoader = () => {},
  stopLoader = () => {},
  removeLeads = () => {},
  activeTab = ON_HOLD,
  loaders = {},
  sort = "",
}) => {
  const actionRef = React.useRef();
  const [showBottonPaginator, setShowBottomPaginator] = React.useState(true);

  const handleImageUpload = async (img, lead) => {
    const formdata = jsonToFormData(lead);
    formdata.set("radio_image", img);
    startLoader("RF_IMAGE_LOADER");
    const data = await asyncFetcher(Apis.uploadRadioImage(lead?.id, formdata));
    updateRadioImage(data?.id, data?.radio_image);
    stopLoader("RF_IMAGE_LOADER");
  };

  const handleRejection = async (lead) => {
    delete lead.radio_image;
    try {
      startLoader("PERFORMING_ACTION");
      const data = await asyncFetcher(Apis.rejectLead(lead?.id, lead), {
        showError: true,
      });
      stopLoader("PERFORMING_ACTION");
      if (data?.id && data?.status === "REJECTED") {
        removeLeads(lead?.id);
      }
    } catch (err) {
      stopLoader("PERFORMING_ACTION");
    }
  };

  const handleAcceptance = async (lead) => {
    try {
      startLoader("PERFORMING_ACTION");
      const data = await asyncFetcher(Apis.acceptLead(lead?.id), {
        showError: true,
      });
      stopLoader("PERFORMING_ACTION");
      removeLeads(lead?.id);
    } catch (err) {
      stopLoader("PERFORMING_ACTION");
    }
  };

  const handleMoveToOnHold = async (lead) => {
    delete lead.radio_image;
    try {
      startLoader("PERFORMING_ACTION");
      const data = await asyncFetcher(Apis.moveToOnHold(lead?.id, lead), {
        showError: true,
      });
      stopLoader("PERFORMING_ACTION");
      if (data?.id && data?.status === "ON_HOLD") {
        removeLeads(lead?.id);
      }
    } catch (err) {
      stopLoader("PERFORMING_ACTION");
    }
  };

  const handleMoveToWaitlisted = async (lead) => {
    delete lead.radio_image;
    try {
      startLoader("PERFORMING_ACTION");
      const data = await asyncFetcher(Apis.waitlistedLead(lead?.id, lead), {
        showError: true,
      });
      stopLoader("PERFORMING_ACTION");
      if (data?.id && data?.status === "WAITLISTED") {
        removeLeads(lead?.id);
      }
    } catch (err) {
      stopLoader("PERFORMING_ACTION");
    }
  };

  React.useEffect(() => {
    if (!actionRef?.current) return;
    const obs = new IntersectionObserver(([entry]) =>
      entry.isIntersecting
        ? setShowBottomPaginator(false)
        : setShowBottomPaginator(true)
    );

    obs.observe(actionRef?.current);

    return () => actionRef?.current && obs.unobserve(actionRef?.current);
  }, [actionRef]);

  return (
    <Box w="full">
      <Box ref={actionRef}>
        <ActionBar {...{ filterOptions, onChange }} />
        <LeadsListHeader />
      </Box>
      {loaders?.[Loaders.GET_LEAD_LIST] ? (
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          w="full"
          pt="10rem"
        >
          <BeatLoader color="#FFFFFF" />
          <Text>Loading {activeTab.toLowerCase().replace("_", " ")} leads</Text>
        </Flex>
      ) : (
        <>
          <Accordion borderRadius="none" defaultIndex={[0]} allowMultiple>
            {leads?.map((lead, i) => (
              <Lead
                key={lead?.id}
                index={i}
                {...lead}
                lead={lead}
                loaders={loaders}
                activeTab={activeTab}
                onReject={handleRejection}
                onAccept={handleAcceptance}
                onImageUpload={handleImageUpload}
                onMoveToOnHold={handleMoveToOnHold}
                onMoveToWaitlisted={handleMoveToWaitlisted}
                sort={sort}
              />
            ))}
            {leads.length === 0 && (
              <Flex
                w="full"
                justifyContent="center"
                alignItems="center"
                h="50vh"
              >
                No leads found
              </Flex>
            )}
          </Accordion>
        </>
      )}
      <Box visibility={showBottonPaginator ? "visible" : "hidden"}>
        <ActionBar {...{ filterOptions, onChange, hideFilter: true }} />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activeTab: state.leads.activeTab,
    leads: state.leads.leads,
    loaders: state.loader,
    sort: state.leads.sort,
  };
};

export default connect(mapStateToProps, {
  updateRadioImage,
  stopLoader,
  startLoader,
  removeLeads,
})(LeadList);
