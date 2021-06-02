import React from "react";
import { connect } from "react-redux";
import Apis from "../../context/apis";
import { setRequestedLeads } from "../../store/actions/leads.actions";
import LeadListView from "./LeadListView";
import { usePagination } from "../PaginationNavigator/usePagination";
import { Box, TabPanel } from "@chakra-ui//react";

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

  React.useEffect(() => {
    if (!ref?.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          Apis.getLeadsList(currentPage, tabType, PAGE_SIZE, filters).then(
            (data) => {
              if (data?.results) {
                setRequestedLeads({
                  leads: data?.results || [],
                  currentPage,
                  isLastPage,
                });
                if (currentPage * PAGE_SIZE > data?.count) {
                  setIsLastPage(true);
                }
              }
            }
          );
        }
      },
      { threshold: 0.5 }
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
    const res = await Apis.rejectLead(lead?.id, lead);
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
    Apis.uploadRadioImage(lead?.id, formdata).then((res) => console.log(res));
  };

  return (
    <Box ref={ref}>
      <LeadListView
        tabType={tabType}
        leads={leads}
        onNext={() => changePage(1)}
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
