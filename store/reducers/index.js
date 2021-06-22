import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { leadReducer } from "./leads.reducer";
import { loaderReducer } from "./loader.reducer";

const reducers = {
  user: userReducer,
  leads: leadReducer,
  loader: loaderReducer,
};

export default combineReducers(reducers);
