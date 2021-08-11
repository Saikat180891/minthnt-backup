import * as types from "../types/types";

export const setFaq = (payload) => (dispatch) =>
  dispatch({
    type: types.SET_FAQ,
    payload,
  });

export const updateFaq = (index, payload) => (dispatch) => {
  console.log(index, payload);
  dispatch({
    type: types.UPDATE_FAQ,
    payload: {
      index,
      values: payload,
      changed: true,
    },
  });
};

export const addFaq = () => (dispatch) => {
  dispatch({
    type: types.ADD_FAQ,
  });
};

export const deleteFqa = (i) => (dispatch) => {
  dispatch({ type: types.DELETE_FAQ, index: i });
};
