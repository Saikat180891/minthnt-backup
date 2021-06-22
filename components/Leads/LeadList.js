// import React from "react";
// import { connect } from "react-redux";
// import { setRequestedLeads } from "../../store/actions/leads.actions";
// import LeadsView from "./LeadsView";
// import { usePagination } from "../PaginationNavigator/usePagination";
// import { Box, TabPanel } from "@chakra-ui//react";
// import { useToast } from "@chakra-ui/react";

// const PAGE_SIZE = 5;
// const RequestedLeads = ({
//   leads = [],
//   tabType = "",
//   setRequestedLeads,
//   filters = {},
// }) => {
//   const ref = React.useRef();
//   const { changePage, setIsLastPage, currentPage, isLastPage } =
//     usePagination();
//   const [isLoading, setLoading] = React.useState(false);

//   React.useEffect(() => {
//     if (!ref?.current) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         // console.log(filters);
//         if (entry.isIntersecting) {
//           setLoading(true);
//           // Apis.getLeadsList(currentPage, tabType, PAGE_SIZE, filters).then(
//           //   (data) => {
//           //     if (data?.data?.results) {
//           //       console.log(data?.data?.results);
//           //       setRequestedLeads({
//           //         leads: data?.data?.results || [],
//           //         currentPage,
//           //         isLastPage,
//           //       });
//           //       if (currentPage * PAGE_SIZE > data?.count) {
//           //         setIsLastPage(true);
//           //       }
//           //     }
//           //     setLoading(false);
//           //   }
//           // );
//         }
//       },
//       { threshold: 0 }
//     );
//     observer.observe(ref.current);
//     return () => {
//       if (ref?.current) observer.unobserve(ref.current);
//     };
//   }, [currentPage, filters]);

//   const handleQueryFiltration = (e) => {
//     console.log(e);
//   };

//   const handleRejection = async (e, lead) => {
//     e.preventDefault();
//     delete lead.radio_image;
//     const res = await Apis.rejectLead(lead?.id, lead).then((res) => {
//       if (res?.status == "FAILURE") {
//         toast({
//           title: "Lead Rejection Failed",
//           description: "",
//           status: "error",
//           duration: 9000,
//           isClosable: true,
//         });
//       } else if (res?.status == "SUCCESS") {
//         toast({
//           title: "Lead Rejected",
//           description: "Check the rejected tab.",
//           status: "success",
//           duration: 9000,
//           isClosable: true,
//         });
//         const leadIndex = leads.indexOf(lead);
//         if (leadIndex > -1) {
//           leads.splice(leadIndex, 1);
//         }
//         setRequestedLeads({
//           leads: [...leads],
//           currentPage,
//           isLastPage,
//         });
//       }
//     });
//     console.log(res);
//   };

//   const toast = useToast();

//   const handleAcceptance = (e, lead) => {
//     e.preventDefault();
//     delete lead.radio_image;
//     Apis.acceptLead(lead?.id).then((res) => {
//       if (res?.status == "FAILURE") {
//         toast({
//           title: "Lead Acceptance Failed",
//           description: res?.errors[0]?.display_msg,
//           status: "error",
//           duration: 9000,
//           isClosable: true,
//         });
//       } else if (res?.status == "SUCCESS") {
//         toast({
//           title: "Lead Accepted",
//           description: "Lead accepted. Check the Accepted tab.",
//           status: "success",
//           duration: 9000,
//           isClosable: true,
//         });
//         const leadIndex = leads.indexOf(lead);
//         if (leadIndex > -1) {
//           leads.splice(leadIndex, 1);
//         }
//         setRequestedLeads({
//           leads: [...leads],
//           currentPage,
//           isLastPage,
//         });
//       }
//     });
//   };

//   return (
//     <Box ref={ref}>
//       <LeadsView
//         tabType={tabType}
//         isLoading={isLoading}
//         onNext={() => changePage(1)}
//         onAccept={handleAcceptance}
//         onPrevious={() => changePage(-1)}
//         onReject={handleRejection}
//         onChange={handleQueryFiltration}
//         onImageUpload={handleImageUpload}
//       />
//     </Box>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     filters: state.leads.others.filters,
//   };
// };

// export default connect(mapStateToProps, { setRequestedLeads })(RequestedLeads);

import { Box, Accordion, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Lead from "./Lead";
import LeadsListHeader from "./LeadsListHeader";
import ActionBar from "../ActionBar";
import { filterOptions } from "./initialValues.model";
import { connect } from "react-redux";
import {
  ACCEPTED_LEADS,
  REJECTED_LEADS,
  ON_HOLD,
} from "../../store/types/types";
import * as Loaders from "../../store/types/loaderTypes";
import { BeatLoader } from "react-spinners";
import Apis, { asyncFetcher } from "../../context/apis";
import { jsonToFormData } from "../../utils";
import { updateRadioImage } from "../../store/actions/leads.actions";
import { stopLoader, startLoader } from "../../store/actions/loader.action";

const LeadList = ({
  leads = [],
  onChange = () => {},
  onReject = () => {},
  onAccept = () => {},
  updateRadioImage = () => {},
  startLoader = () => {},
  stopLoader = () => {},
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
          {loaders?.[Loaders?.GET_LEAD_LIST] && "Loading"}
          <LeadsListHeader />
          <Accordion borderRadius="none" defaultIndex={[0]} allowMultiple>
            {leads?.map((lead, i) => (
              <Lead
                key={lead?.id}
                index={i}
                {...lead}
                lead={lead}
                loaders={loaders}
                activeTab={activeTab}
                onReject={onReject}
                onAccept={onAccept}
                onImageUpload={handleImageUpload}
                sort={sort}
              />
            ))}
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
})(LeadList);
