import React from "react";
import { connect } from "react-redux";
import Apis from "../../context/apis";
import { setRequestedLeads } from "../../store/actions/leads.actions";
import LeadListView from "./LeadListView";
import { usePagination } from "../PaginationNavigator/usePagination";

const PAGE_SIZE = 5;
const RequestedLeads = ({ leads = [], tabType = "", setRequestedLeads }) => {
  const { changePage, setIsLastPage, currentPage, isLastPage } =
    usePagination();

  React.useEffect(() => {
    Apis.getLeadsList(currentPage, PAGE_SIZE).then((data) => {
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
    });
  }, [currentPage]);

  return (
    <LeadListView
      leads={leads}
      onNext={() => changePage(1)}
      onPrevious={() => changePage(-1)}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    leads: state.leads.requestedLeads.leads,
  };
};

export default connect(mapStateToProps, { setRequestedLeads })(RequestedLeads);
