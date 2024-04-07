// import isLogged from "./isLogged";
// import main from "./main";
import auth from "./auth";
import message from "./message";
// import user from "./user";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth,
  message,
  // user,
});

export default rootReducer;
