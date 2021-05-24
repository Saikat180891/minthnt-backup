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
    default:
      return state;
  }
};
