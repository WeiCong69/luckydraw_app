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

const showAllRoom = async () => {
  return await axios.get(API_URL + "room/all").then((response) => {
    return response.data;
  });
};

const creatNewRoom = async (roomName) => {
  return await axios.post(API_URL + "room/create", {
    "name": roomName,
    "isActive": true,
  }).then((response) => {
    return response.data;
  });
};

const deleteRoom = async (id) => {
  return await axios.post(API_URL + "room/delete", {
    "roomId": id,
  }).then((response) => {
    return response.data;
  });
}

const getGiftsByRoom = async (roomId) => {
  return await axios.post(API_URL + "gift/getAllByRoom", {
    roomId: roomId
  }).then((response) => {
    return response.data;
  });
};

const saveGifts = async (gifts) => {
  return await axios.post(API_URL + "gift/create", {
    gifts: gifts
  }).then((response) => {
    return response.data;
  });
}

const deleteGift = async (id) => {
  return await axios.post(API_URL + "gift/delete", {
    id: id
  }).then((response) => {
    return response.data;
  });
}






const user = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  updateProfile,
  showAllUser,
  showAllRoom,
  getGiftsByRoom,
  creatNewRoom,
  saveGifts,
  deleteGift,
  deleteRoom
};
export default user;
