import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const updateProfile = (id, firstname, lastname) => {
  return axios
    .post(API_URL + "updateProfile", {
      userId: id,
      firstname: firstname,
      lastname: lastname,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    });
};

const showAllUser = async () => {
  return await axios.get(API_URL + "user/list").then((response) => {
    return response.data;
  });
};

const user = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  updateProfile,
  showAllUser,
};
export default user;
