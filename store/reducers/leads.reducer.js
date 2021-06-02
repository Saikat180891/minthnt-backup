import * as types from "../types/types";

const initialLeadState = {
  requestedLeads: {
    currentPage: 1,
    isLastPage: false,
    leads: [],
  },
  acceptedLeads: {
    currentPage: 1,
    isLastPage: false,
    leads: [],
  },
  rejectedLeads: {
    currentPage: 1,
    isLastPage: false,
    leads: [],
  },
  others: {
    filters: {},
  },
};

export const leadReducer = (state = initialLeadState, { type, payload }) => {
  switch (type) {
    case types.GET_REQUESTED_LEADS:
      return {
        ...state,
        requestedLeads: {
          ...payload,
        },
      };
    case types.ADD_FILTER:
      return {
        ...state,
        others: {
          ...state.others,
          filters: {
            ...state?.others?.filters,
            ...payload,
          },
        },
      };
    case types.REMOVE_FILTER:
      const appliedFilters = state?.others?.filters;
      delete appliedFilters[payload];
      return {
        ...state,
        others: {
          ...state.others,
          filters: {
            ...appliedFilters,
          },
        },
      };
    default:
      return state;
  }
};
