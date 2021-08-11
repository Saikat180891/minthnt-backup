import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { leadReducer } from "./leads.reducer";
import { loaderReducer } from "./loader.reducer";
import { faqReducer } from "./faq.reducer";

const reducers = {
  user: userReducer,
  leads: leadReducer,
  loader: loaderReducer,
  faq: faqReducer,
};

export default combineReducers(reducers);
