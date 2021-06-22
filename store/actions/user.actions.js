import * as types from "../types/types";

export const setUserDetails = (payload) => (dispatch) =>
  dispatch({
    type: types.SET_USER_DETAILS,
    payload,
  });

export const setUserInfo = (payload) => (dispatch) =>
  dispatch({
    type: types.SET_USER_INFO,
    payload,
  });
