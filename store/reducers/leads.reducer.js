import * as types from "../types/types";

const ITEMS_PER_PAGE = 10;

const initialLeadState = {
  others: {
    filters: {},
  },
  activeTab: types.ON_HOLD,
  currentPage: 1,
  totalCount: 0,
  itemsPerPage: ITEMS_PER_PAGE,
  leads: [],
  sort: "",
};

export const leadReducer = (state = initialLeadState, action) => {
  // console.log("ACTION", action);

  switch (action.type) {
    case types.SET_LEADS:
      return {
        ...state,
        leads: action.payload?.leads,
        totalCount: action.payload?.count,
      };
    case types.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
    case types.ADD_FILTER:
      return {
        ...state,
        others: {
          ...state.others,
          filters: {
            ...state?.others?.filters,
            ...action.payload,
          },
        },
      };
    case types.REMOVE_FILTER:
      const appliedFilters = state?.others?.filters;
      delete appliedFilters[action.payload];
      return {
        ...state,
        others: {
          ...state.others,
          filters: {
            ...appliedFilters,
          },
        },
      };
    case types.UPDATE_RADIO_IMAGE:
      return {
        ...state,
        leads: state.leads.map((lead) => {
          if (lead.id === action.payload.id) {
            return {
              ...lead,
              radio_image: action.payload.image,
            };
          } else {
            return lead;
          }
        }),
      };
    case types.UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case types.SET_SORT:
      const key = action.payload;
      return {
        ...state,
        sort: state.sort === key ? "" : key,
      };
    default:
      return state;
  }
};
