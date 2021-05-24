import * as types from "../types/types";

const initialUserState = {
  token: null,
  user: {},
};

export const userReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case types.SET_USER_DETAILS:
      console.log("payload", payload);
      return {
        ...state,
        token: payload?.token,
        isLoggedIn: payload?.isLoggedIn,
      };
    default:
      return state;
  }
};
