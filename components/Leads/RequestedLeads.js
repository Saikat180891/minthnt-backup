import React from "react";
import { connect } from "react-redux";
import Apis from "../../context/apis";
import { setRequestedLeads } from "../../store/actions/leads.actions";
import LeadListView from "./LeadListView";
import { usePagination } from "../PaginationNavigator/usePagination";
import { Box, TabPanel } from "@chakra-ui//react";
import { useToast } from "@chakra-ui/react"


const PAGE_SIZE = 5;
const RequestedLeads = ({
  leads = [],
  tabType = "",
  setRequestedLeads,
  filters = {},
}) => {
  const ref = React.useRef();
  const { changePage, setIsLastPage, currentPage, isLastPage } =
    usePagination();
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!ref?.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(filters);
        if (entry.isIntersecting) {
          setLoading(true);
          Apis.getLeadsList(currentPage, tabType, PAGE_SIZE, filters).then(
            (data) => {
              if (data?.data?.results) {
                console.log(data?.data?.results);
                setRequestedLeads({
                  leads: data?.data?.results || [],
                  currentPage,
                  isLastPage,
                });
                if (currentPage * PAGE_SIZE > data?.count) {
                  setIsLastPage(true);
                }
              }
              setLoading(false);
            }
          );
        }
      },
      { threshold: 0 }
    );
    observer.observe(ref.current);
    return () => {
      if (ref?.current) observer.unobserve(ref.current);
    };
  }, [currentPage, filters]);

  const handleQueryFiltration = (e) => {
    console.log(e);
  };

  const handleRejection = async (e, lead) => {
    e.preventDefault();
    delete lead.radio_image;
    const res = await Apis.rejectLead(lead?.id, lead).then(res => {
      if(res?.status=="FAILURE") {
        toast({
          title: "Lead Rejection Failed",
          description: "",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
      else if(res?.status=="SUCCESS") {
        toast({
          title: "Lead Rejected",
          description: "Check the rejected tab.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }

    });
    console.log(res);
  };

  const jsonToFormData = (obj = {}) => {
    const formdata = new FormData();
    for (let key in obj) {
      formdata.set(key, obj[key]);
    }
    return formdata;
  };

  const handleImageUpload = (img, lead) => {
    const formdata = jsonToFormData(lead);
    formdata.set("radio_image", img);
    Apis.uploadRadioImage(lead?.id, formdata).then((res) => {})
  };
  const toast = useToast();

  const handleAcceptance = (e, lead) => {
    e.preventDefault();
    delete lead.radio_image;
    Apis.acceptLead(lead?.id).then((res) => {
      if(res?.status=="FAILURE") {
        toast({
          title: "Lead Acceptance Failed",
          description: res?.errors[0]?.display_msg,
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
      else if(res?.status=="SUCCESS") {
        toast({
          title: "Lead Accepted",
          description: "Lead accepted. Check the Accepted tab.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }


    });
  };

  return (
    <Box ref={ref}>
      <LeadListView
        tabType={tabType}
        leads={leads}
        isLoading={isLoading}
        onNext={() => changePage(1)}
        onAccept={handleAcceptance}
        onPrevious={() => changePage(-1)}
        onReject={handleRejection}
        onChange={handleQueryFiltration}
        onImageUpload={handleImageUpload}
      />
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    leads: state.leads.requestedLeads.leads,
    filters: state.leads.others.filters,
  };
};

export default connect(mapStateToProps, { setRequestedLeads })(RequestedLeads);
