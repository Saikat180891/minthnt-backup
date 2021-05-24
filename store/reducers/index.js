import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { leadReducer } from "./leads.reducer";

const reducers = {
  user: userReducer,
  leads: leadReducer,
};

export default combineReducers(reducers);
