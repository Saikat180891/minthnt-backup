import * as types from "../types/types";

const initialUserState = {};

export const loaderReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case types.START_LOADER:
      return {
        ...state,
        [payload.id]: true,
      };
    case types.STOP_LOADER:
      return {
        ...state,
        [payload.id]: false,
      };
    default:
      return state;
  }
};
