import db from "../models/index.js";
const User = db.users;
const UserDetails = db.userDetails;

const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

const profile = async (req, res) => {
  const request = req.body;
  const user = await User.findByPk(request.userId);
  if (user === null) {
    console.log("Not found!");
  } else {
    console.log(user instanceof User); // true
    // Its primary key is 123
  }
  res.status(200).send(user);
};
const updateProfile = async (req, res) => {
  const request = req.body;
  try {
    const user = await User.findByPk(request.userId);
    // if(request.email === user.email){

    // }
    user.update({
      firstname: request.firstname,
      lastname: request.lastname,
    });
    const token = req.session.token;
    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }
    // console.log("fuck", user);
    const data = { message: "Update Successfully", user, token, authorities };
    res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const showAllUser = async (req, res) => {
  const request = req.body;
  try {
    const allUser = await User.findAll({
      include: [
        {
          model: UserDetails,
        },
      ],
    });
    res.status(200).send(allUser);
  } catch (e) {
    return res.status(500).send({ message: error.message });
  }
};

export default {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  profile,
  updateProfile,
  showAllUser,
};
