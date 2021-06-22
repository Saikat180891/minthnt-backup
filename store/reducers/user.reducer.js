import * as types from "../types/types";

const initialUserState = {
  token: null,
  user: {},
};

export const userReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case types.SET_USER_DETAILS:
      return {
        ...state,
        token: payload?.token,
        isLoggedIn: payload?.isLoggedIn,
      };
    case types.SET_USER_INFO:
      return {
        ...state,
        user: {
          ...payload,
        },
      };
    default:
      return state;
  }
};
