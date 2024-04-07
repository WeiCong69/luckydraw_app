import {
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from "../actions/types";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user;
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };

function users(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
      };

    case PROFILE_FAIL:
      return {
        ...state,
      };
    /* case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        // user: payload.user,
      };

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
      }; */
    default:
      return state;
  }
}

export default users;
