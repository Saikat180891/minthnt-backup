import * as types from "../types/types";

const initialUserState = {
  faqs: [],
  changed: false,
};

export const faqReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case types.SET_FAQ:
      return {
        ...state,
        faqs: payload,
      };
    case types.UPDATE_FAQ:
      console.log(payload);
      const { index, changed, values } = payload;
      return {
        ...state,
        changed: changed,
        faqs: state.faqs.map((faq, i) => {
          if (i === index) {
            return {
              ...faq,
              ...values,
            };
          } else return faq;
        }),
      };
    case types.DELETE_FAQ:
      const faqs = state.faqs;
      faqs.splice(index, 1);
      return {
        ...state,
        faqs: faqs,
      };
    case types.ADD_FAQ:
      return {
        ...state,
        faqs: [...state.faqs, { type: [], ques: "", ans: "" }],
      };
    default:
      return state;
  }
};
