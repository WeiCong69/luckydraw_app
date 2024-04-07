import axios from "axios";
const API_URL = "/api/auth/";

const register = (firstname, lastname, email, password) => {
  return axios.post(API_URL + "signup", {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
  });
};

const login = async (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("role", JSON.stringify(response.data.roles));
      }
      return response.data;
    });
};

const logout = () => {
  var color_mode = localStorage.getItem("chakra-ui-color-mode");
  localStorage.clear();
  localStorage.setItem("chakra-ui-color-mode", color_mode);
};

const auth = {
  register,
  login,
  logout,
};

export default auth;
