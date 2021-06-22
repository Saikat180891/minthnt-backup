import * as types from "../types/types";

export const startLoader = (id) => (dispatch) =>
  dispatch({
    type: types.START_LOADER,
    payload: {
      id: id,
    },
  });

export const stopLoader = (id) => (dispatch) =>
  dispatch({
    type: types.STOP_LOADER,
    payload: {
      id: id,
    },
  });
