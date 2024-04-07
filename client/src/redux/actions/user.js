import {
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from "./types";
import UserService from "../../services/user.service";

export const getProfile = (id) => (dispatch) => {
  return UserService.profile(id).then(
    (response) => {
      dispatch({
        type: PROFILE_SUCCESS,
      });
      return Promise.resolve(response);
    },
    (error) => {
      /*  const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(); */

      dispatch({
        type: PROFILE_FAIL,
      });
      return Promise.reject(error);
    }
  );
};

export const updateProfile = (id, firstname, lastname) => (dispatch) => {
  return UserService.updateProfile(id, firstname, lastname).then(
    (response) => {
      console.log("ressponsddsdsa redux", response);
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: { user: response },
      });
      return Promise.resolve(response);
    },
    (error) => {
      /* const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(); */

      dispatch({
        type: UPDATE_PROFILE_FAIL,
      });
      return Promise.reject(error);
    }
  );
};
