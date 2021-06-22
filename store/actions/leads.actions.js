import * as types from "../types/types";

export const addFilters = (payload) => (dispatch) => {
  dispatch({
    type: types.ADD_FILTER,
    payload,
  });
  console.log(payload);
};

export const removeFilter = (key) => (dispatch) => {
  dispatch({
    type: types.REMOVE_FILTER,
    payload: key,
  });
};

export const setLeads = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_LEADS,
    payload,
  });
};

export const setActiveTab = (tabType) => (dispatch) => {
  dispatch({
    type: types.SET_ACTIVE_TAB,
    payload: tabType,
  });
};

export const updateRadioImage = (id, image) => (dispatch) => {
  dispatch({
    type: types.UPDATE_RADIO_IMAGE,
    payload: {
      id,
      image,
    },
  });
};

export const nextPage = () => (dispatch, getState) => {
  const leads = getState().leads;
  const { currentPage, itemsPerPage, totalCount } = leads;
  if (currentPage * itemsPerPage < totalCount) {
    dispatch({
      type: types.UPDATE_CURRENT_PAGE,
      payload: currentPage + 1,
    });
  }
};

export const previousPage = () => (dispatch, getState) => {
  const leads = getState().leads;
  const { currentPage, itemsPerPage, totalCount } = leads;
  if (currentPage > 1) {
    dispatch({
      type: types.UPDATE_CURRENT_PAGE,
      payload: currentPage - 1,
    });
  }
};

export const sortBy =
  (key = "") =>
  (dispatch) => {
    dispatch({
      type: types.SET_SORT,
      payload: key,
    });
  };

export const removeLeads = (id) => (dispatch) => {
  dispatch({
    type: types.REMOVE_LEAD,
    payload: id,
  });
};
