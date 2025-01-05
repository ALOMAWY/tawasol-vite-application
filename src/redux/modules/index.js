import { combineReducers } from "redux";
import users from "./users";
import alerts from "./alerts";
import profiles from "./profiles";
import posts from "./posts";

export default combineReducers({
  profiles,
  users,
  alerts,
  posts,
});
