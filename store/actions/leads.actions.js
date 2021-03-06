import * as types from "../types/types";

export const setRequestedLeads = (payload) => (dispatch) =>
  dispatch({
    type: types.GET_REQUESTED_LEADS,
    payload,
  });

export const setRejectedLeads = (payload) => (dispatch) =>
  dispatch({
    type: types.GET_REJECTED_LEADS,
    payload,
  });

export const setAcceptedLeads = (payload) => (dispatch) =>
  dispatch({
    type: types.GET_ACCEPTED_LEADS,
    payload,
  });
